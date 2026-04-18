import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

import {
  createSupportedDraft,
  createTaskFromDocument,
  createUnsupportedDraft,
  defaultPersistedState,
} from '../data/mockData';
import { seedReferrals } from '../data/referrals';
import { deleteDocumentImage, wipeAllImages } from '../services/imageStore';
import {
  cancelAllReminders,
  cancelReminder,
  parseTaskDate,
  scheduleTaskReminder,
} from '../services/notificationService';
import { processScan } from '../services/scanPipeline';
import { getUpdatedReferrals } from '../services/referralUpdater';
import { AppState, LanguageCode, PersistedState, ScanDraft } from '../types';

const STORAGE_KEY = '@claro/app-state-v1';

interface AppActions {
  setLanguage: (language: LanguageCode) => void;
  setRegion: (region: string) => void;
  completeOnboarding: () => void;
  startSampleScan: (mode: 'supported' | 'unsupported') => void;
  setScanDraft: (draft: ScanDraft) => void;
  processImage: (imageUri: string) => Promise<void>;
  toggleDraftField: (key: 'agency' | 'documentType' | 'eventDate' | 'location' | 'nextAction') => void;
  buildDraftTask: () => void;
  clearDraftTask: () => void;
  persistDraft: () => Promise<void>;
  discardDraft: () => void;
  markTaskDone: (taskId: string) => void;
  deleteDocument: (documentId: string) => void;
  fullWipe: () => Promise<void>;
}

interface AppContextValue {
  state: AppState;
  actions: AppActions;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [persistedState, setPersistedState] = useState<PersistedState>(defaultPersistedState);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    async function loadState() {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);

        if (!raw) {
          setHydrated(true);
          return;
        }

        const parsed = JSON.parse(raw) as Partial<PersistedState>;

        setPersistedState({
          ...defaultPersistedState,
          ...parsed,
          referrals: parsed.referrals?.length ? parsed.referrals : seedReferrals,
        });
      } finally {
        setHydrated(true);
      }
    }

    loadState().catch(() => {
      setHydrated(true);
    });
  }, []);

  // Auto-update referrals from server when online
  useEffect(() => {
    if (!hydrated) return;

    getUpdatedReferrals(persistedState.referrals)
      .then(({ referrals, updated }) => {
        if (updated) {
          setPersistedState((current) => ({ ...current, referrals }));
        }
      })
      .catch(() => {
        // Silently ignore — offline or server unreachable
      });
  }, [hydrated]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(persistedState)).catch(() => {
      return;
    });
  }, [hydrated, persistedState]);

  const actions: AppActions = {
    setLanguage(language) {
      setPersistedState((current) => ({
        ...current,
        selectedLanguage: language,
      }));
    },
    setRegion(region) {
      setPersistedState((current) => ({
        ...current,
        regionLabel: region,
      }));
    },
    completeOnboarding() {
      setPersistedState((current) => ({
        ...current,
        onboardingComplete: true,
      }));
    },
    startSampleScan(mode) {
      setPersistedState((current) => ({
        ...current,
        scanDraft: mode === 'supported' ? createSupportedDraft() : createUnsupportedDraft(),
      }));
    },
    setScanDraft(draft) {
      setPersistedState((current) => ({
        ...current,
        scanDraft: draft,
      }));
    },
    async processImage(imageUri) {
      const draft = await processScan(imageUri);
      setPersistedState((current) => ({
        ...current,
        scanDraft: draft,
      }));
    },
    toggleDraftField(key) {
      setPersistedState((current) => {
        if (!current.scanDraft) {
          return current;
        }

        return {
          ...current,
          scanDraft: {
            ...current.scanDraft,
            document: {
              ...current.scanDraft.document,
              fields: current.scanDraft.document.fields.map((field) =>
                field.key === key ? { ...field, confirmed: !field.confirmed } : field
              ),
            },
          },
        };
      });
    },
    buildDraftTask() {
      setPersistedState((current) => {
        if (!current.scanDraft) {
          return current;
        }

        return {
          ...current,
          scanDraft: {
            ...current.scanDraft,
            pendingTask: current.scanDraft.pendingTask ?? createTaskFromDocument(current.scanDraft.document),
          },
        };
      });
    },
    clearDraftTask() {
      setPersistedState((current) => {
        if (!current.scanDraft) {
          return current;
        }

        return {
          ...current,
          scanDraft: {
            ...current.scanDraft,
            pendingTask: undefined,
          },
        };
      });
    },
    async persistDraft() {
      // Capture draft before the state update to avoid stale closure
      let capturedTask: typeof persistedState.scanDraft extends null ? never : NonNullable<typeof persistedState.scanDraft>['pendingTask'] | undefined;

      setPersistedState((current) => {
        if (!current.scanDraft) {
          return current;
        }

        if (current.scanDraft.persisted) {
          return {
            ...current,
            lastCompletedDocumentId: current.scanDraft.document.id,
          };
        }

        // Capture the task from within the updater (fresh state)
        capturedTask = current.scanDraft.pendingTask;

        const nextDocuments = [
          current.scanDraft.document,
          ...current.documents.filter((document) => document.id !== current.scanDraft?.document.id),
        ];
        const nextTasks = current.scanDraft.pendingTask
          ? [
              current.scanDraft.pendingTask,
              ...current.tasks.filter((task) => task.id !== current.scanDraft?.pendingTask?.id),
            ]
          : current.tasks;

        return {
          ...current,
          documents: nextDocuments,
          tasks: nextTasks,
          lastCompletedDocumentId: current.scanDraft.document.id,
          scanDraft: {
            ...current.scanDraft,
            persisted: true,
          },
        };
      });

      // Schedule notification using the captured (fresh) task
      if (capturedTask) {
        const dueDate = parseTaskDate(capturedTask.dueDate);
        if (dueDate) {
          try {
            const notifId = await scheduleTaskReminder(
              capturedTask.id,
              capturedTask.title,
              capturedTask.reason,
              dueDate,
            );
            if (notifId) {
              const taskId = capturedTask.id;
              setPersistedState((current) => ({
                ...current,
                tasks: current.tasks.map((t) =>
                  t.id === taskId
                    ? { ...t, notificationId: notifId }
                    : t,
                ),
              }));
            }
          } catch {
            // Notification scheduling failed — document still saved
          }
        }
      }
    },
    discardDraft() {
      setPersistedState((current) => ({
        ...current,
        scanDraft: null,
      }));
    },
    markTaskDone(taskId) {
      setPersistedState((current) => ({
        ...current,
        tasks: current.tasks.map((task) =>
          task.id === taskId ? { ...task, status: 'done' } : task
        ),
      }));
    },
    deleteDocument(documentId) {
      // Delete the image file from disk before removing from state
      const doc = persistedState.documents.find((d) => d.id === documentId);
      if (doc?.imageUri) {
        deleteDocumentImage(doc.imageUri).catch(() => {});
      }
      // Cancel any associated task reminders
      const relatedTasks = persistedState.tasks.filter((t) => t.documentId === documentId);
      for (const task of relatedTasks) {
        if (task.notificationId) {
          cancelReminder(task.notificationId).catch(() => {});
        }
      }
      setPersistedState((current) => ({
        ...current,
        documents: current.documents.filter((document) => document.id !== documentId),
        tasks: current.tasks.filter((task) => task.documentId !== documentId),
        lastCompletedDocumentId:
          current.lastCompletedDocumentId === documentId ? null : current.lastCompletedDocumentId,
      }));
    },
    async fullWipe() {
      await wipeAllImages();
      await cancelAllReminders();
      setPersistedState((current) => ({
        ...current,
        documents: [],
        tasks: [],
        scanDraft: null,
        lastCompletedDocumentId: null,
      }));
    },
  };

  const value = useMemo<AppContextValue>(
    () => ({
      state: {
        ...persistedState,
        hydrated,
      },
      actions,
    }),
    [hydrated, persistedState]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppStore() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useAppStore must be used inside AppProvider');
  }

  return context;
}