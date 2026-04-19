import * as Speech from 'expo-speech';
import * as ImagePicker from 'expo-image-picker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { ActionButton } from '../components/ActionButton';
import { ScreenLayout } from '../components/ScreenLayout';
import { SurfaceCard } from '../components/SurfaceCard';
import { useAppStore } from '../context/AppProvider';
import { getExplanation } from '../data/mockData';
import { sampleImages } from '../data/sampleImages';
import { detectScamWarnings } from '../data/scamPatterns';
import { getCopy } from '../data/translations';
import { RootStackParamList } from '../navigation/AppNavigator';
import { theme } from '../theme';
import { LanguageCode } from '../types';

function speechCode(language: LanguageCode | null) {
  if (language === 'es') {
    return 'es-US';
  }

  if (language === 'ht') {
    return 'fr-FR';
  }

  return 'en-US';
}

function DraftFieldList({
  onToggle,
}: {
  onToggle?: (key: 'agency' | 'documentType' | 'eventDate' | 'location' | 'nextAction') => void;
}) {
  const { state } = useAppStore();
  const text = getCopy(state.selectedLanguage);

  if (!state.scanDraft) {
    return <Text style={styles.muted}>{text.nothingHere}</Text>;
  }

  return (
    <View style={styles.stack}>
      {state.scanDraft.document.fields.map((field) => {
        const label =
          field.key === 'agency'
            ? text.fieldAgency
            : field.key === 'documentType'
              ? text.fieldDocumentType
              : field.key === 'eventDate'
                ? text.fieldEventDate
                : field.key === 'location'
                  ? text.fieldLocation
                  : text.fieldNextAction;

        return (
          <Pressable
            key={field.key}
            onPress={onToggle ? () => onToggle(field.key) : undefined}
            disabled={!onToggle}
            style={[
              styles.fieldCard,
              {
                borderColor: field.confirmed ? theme.colors.success : theme.colors.border,
              },
            ]}
          >
            <Text style={styles.fieldLabel}>{label}</Text>
            <Text style={styles.fieldValue}>{field.value}</Text>
            <Text style={styles.fieldMeta}>
              {field.confirmed ? text.confirmYes : text.confirmNo}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export function CameraCaptureScreen({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'CameraCapture'>) {
  const { state, actions } = useAppStore();
  const text = getCopy(state.selectedLanguage);

  async function handleCamera() {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(text.cameraPermissionTitle, text.cameraPermissionBody);
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'],
      quality: 0.8,
    });
    if (!result.canceled && result.assets[0]) {
      navigation.navigate('ImageReview', { imageUri: result.assets[0].uri });
    }
  }

  async function handleGallery() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 0.8,
    });
    if (!result.canceled && result.assets[0]) {
      navigation.navigate('ImageReview', { imageUri: result.assets[0].uri });
    }
  }

  return (
    <ScreenLayout title={text.cameraTitle} subtitle={text.cameraSubtitle}>
      <View style={styles.stack}>
        <ActionButton label={text.takePhoto} onPress={handleCamera} />
        <ActionButton
          label={text.chooseFromGallery}
          variant="secondary"
          onPress={handleGallery}
        />
      </View>
      <SurfaceCard tone="accent" eyebrow={text.demoMode}>
        <Text style={styles.bodyText}>{text.devModeNotice}</Text>
      </SurfaceCard>
      <View style={styles.stack}>
        <ActionButton
          label={text.supportedDemo}
          variant="secondary"
          onPress={() => {
            actions.startSampleScan('supported');
            navigation.navigate('ImageReview');
          }}
        />
        <ActionButton
          label={text.unsupportedDemo}
          variant="secondary"
          onPress={() => {
            actions.startSampleScan('unsupported');
            navigation.navigate('ImageReview');
          }}
        />
      </View>
    </ScreenLayout>
  );
}

export function ImageReviewScreen({
  navigation,
  route,
}: NativeStackScreenProps<RootStackParamList, 'ImageReview'>) {
  const { state } = useAppStore();
  const text = getCopy(state.selectedLanguage);
  const imageUri = route.params?.imageUri;

  return (
    <ScreenLayout title={text.imageReviewTitle} subtitle={text.imageReviewSubtitle}>
      <SurfaceCard tone="accent" title={imageUri ? text.imageReviewTitle : (state.scanDraft?.imageLabel ?? text.nothingHere)}>
        {imageUri ? (
          <Image
            source={{ uri: imageUri }}
            style={styles.previewImage}
            resizeMode="contain"
            accessibilityLabel={text.imageReviewTitle}
          />
        ) : state.scanDraft?.sampleImageKey && sampleImages[state.scanDraft.sampleImageKey] ? (
          <Image
            source={sampleImages[state.scanDraft.sampleImageKey]}
            style={styles.previewImage}
            resizeMode="contain"
            accessibilityLabel={state.scanDraft.imageLabel}
          />
        ) : (
          <View style={styles.previewBox}>
            <Text style={styles.previewText}>{state.scanDraft?.imageLabel ?? text.nothingHere}</Text>
          </View>
        )}
      </SurfaceCard>
      <View style={styles.stack}>
        <ActionButton
          label={text.usePhoto}
          onPress={() =>
            navigation.navigate('Processing', imageUri ? { imageUri } : undefined)
          }
        />
        <ActionButton label={text.retake} variant="secondary" onPress={() => navigation.goBack()} />
      </View>
    </ScreenLayout>
  );
}

export function ProcessingScreen({
  navigation,
  route,
}: NativeStackScreenProps<RootStackParamList, 'Processing'>) {
  const { state, actions } = useAppStore();
  const text = getCopy(state.selectedLanguage);
  const imageUri = route.params?.imageUri;
  const [processing, setProcessing] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      if (imageUri) {
        // Real scan pipeline
        try {
          await actions.processImage(imageUri);
        } catch {
          if (!cancelled) setError(true);
        }
      }
      // Demo mode: scanDraft already set
      if (!cancelled) setProcessing(false);
    }

    run();
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (!processing && !error && state.scanDraft) {
      navigation.replace(
        state.scanDraft.mode === 'unsupported' ? 'UnsupportedResult' : 'SupportedResult',
      );
    }
  }, [processing, error, state.scanDraft]);

  if (error) {
    return (
      <ScreenLayout title={text.processingTitle} subtitle={text.unsupportedBody}>
        <SurfaceCard tone="danger">
          <Text style={styles.bodyText}>{text.unsupportedBody}</Text>
        </SurfaceCard>
        <ActionButton label={text.returnHome} onPress={() => navigation.navigate('Home')} />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title={text.processingTitle} subtitle={text.scanningDocument}>
      <SurfaceCard tone="accent" eyebrow={text.localOnly}>
        <ActivityIndicator color={theme.colors.primary} size="large" />
        <Text style={styles.bodyText}>{text.ocrInProgress}</Text>
      </SurfaceCard>
    </ScreenLayout>
  );
}

export function SupportedResultScreen({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'SupportedResult'>) {
  const { state } = useAppStore();
  const text = getCopy(state.selectedLanguage);

  if (!state.scanDraft) {
    return (
      <ScreenLayout title={text.supportedTitle} subtitle={text.nothingHere}>
        <ActionButton label={text.returnHome} onPress={() => navigation.navigate('Home')} />
      </ScreenLayout>
    );
  }

  const explanation = getExplanation(state.scanDraft.document, state.selectedLanguage);
  const localScamWarnings = detectScamWarnings(state.scanDraft.ocrText);
  const gemmaScamWarnings = state.scanDraft.scamWarnings ?? [];
  const scamWarnings = gemmaScamWarnings.length > 0 ? gemmaScamWarnings : localScamWarnings;

  return (
    <ScreenLayout title={text.supportedTitle} subtitle={text.supportedSubtitle}>
      {state.scanDraft.gemmaModel ? (
        <View style={styles.gemmaBadge}>
          <Text style={styles.gemmaBadgeText}>Powered by Gemma 4 · {state.scanDraft.gemmaModel}</Text>
        </View>
      ) : null}
      {state.scanDraft.imageUri ? (
        <Image
          source={{ uri: state.scanDraft.imageUri }}
          style={styles.resultImage}
          resizeMode="contain"
        />
      ) : state.scanDraft.sampleImageKey && sampleImages[state.scanDraft.sampleImageKey] ? (
        <Image
          source={sampleImages[state.scanDraft.sampleImageKey]}
          style={styles.resultImage}
          resizeMode="contain"
        />
      ) : null}
      <SurfaceCard tone="accent" eyebrow={`${text.confidence}: ${Math.round(state.scanDraft.document.confidence * 100)}%`} title={explanation.title}>
        <Text style={styles.bodyText}>{explanation.summary}</Text>
        <Text style={styles.bodyText}>{explanation.whyItMatters}</Text>
        <Text style={styles.bodyText}>{explanation.nextStep}</Text>
        <ActionButton
          label={text.playAudio}
          variant="secondary"
          onPress={() => {
            Speech.stop();
            Speech.speak(
              `${explanation.summary} ${explanation.whyItMatters} ${explanation.nextStep}`,
              { language: speechCode(state.selectedLanguage) }
            );
          }}
        />
      </SurfaceCard>
      {scamWarnings.length > 0 ? (
        <SurfaceCard tone="danger" eyebrow={text.scamWarningTitle}>
          {scamWarnings.map((w) => (
            <Text key={w.id} style={styles.bodyText}>
              {w.message[state.selectedLanguage ?? 'en']}
            </Text>
          ))}
        </SurfaceCard>
      ) : null}
      <SurfaceCard tone="warning" eyebrow={text.highRisk}>
        <Text style={styles.bodyText}>{text.reviewHelp}</Text>
      </SurfaceCard>
      <ActionButton label={text.continueReview} onPress={() => navigation.navigate('DetailConfirmation')} />
    </ScreenLayout>
  );
}

export function UnsupportedResultScreen({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'UnsupportedResult'>) {
  const { state, actions } = useAppStore();
  const text = getCopy(state.selectedLanguage);
  const explanation = state.scanDraft
    ? getExplanation(state.scanDraft.document, state.selectedLanguage)
    : null;
  const confidencePercent = state.scanDraft
    ? Math.round(state.scanDraft.document.confidence * 100)
    : 0;

  return (
    <ScreenLayout title={text.unsupportedTitle} subtitle={text.unsupportedBody}>
      {state.scanDraft?.gemmaModel ? (
        <View style={styles.gemmaBadge}>
          <Text style={styles.gemmaBadgeText}>Powered by Gemma 4 · {state.scanDraft.gemmaModel}</Text>
        </View>
      ) : null}
      {state.scanDraft?.imageUri ? (
        <Image
          source={{ uri: state.scanDraft.imageUri }}
          style={styles.resultImage}
          resizeMode="contain"
        />
      ) : state.scanDraft?.sampleImageKey && sampleImages[state.scanDraft.sampleImageKey] ? (
        <Image
          source={sampleImages[state.scanDraft.sampleImageKey]}
          style={styles.resultImage}
          resizeMode="contain"
        />
      ) : null}
      <SurfaceCard tone="danger" eyebrow={`${text.confidence}: ${confidencePercent}%`} title={explanation?.title ?? text.lowConfidence}>
        <Text style={styles.bodyText}>{text.unsupportedBody}</Text>
        <ActionButton
          label={text.playAudio}
          variant="secondary"
          onPress={() => {
            Speech.stop();
            Speech.speak(text.unsupportedBody, { language: speechCode(state.selectedLanguage) });
          }}
        />
      </SurfaceCard>
      <View style={styles.stack}>
        <ActionButton label={text.getHelp} onPress={() => navigation.navigate('ReferralList')} />
        <ActionButton
          label={text.retakePhoto}
          variant="secondary"
          onPress={() => {
            actions.discardDraft();
            navigation.navigate('CameraCapture');
          }}
        />
        <ActionButton
          label={text.saveAnyway}
          variant="secondary"
          onPress={async () => {
            await actions.persistDraft();
            navigation.replace('Completion');
          }}
        />
      </View>
    </ScreenLayout>
  );
}

export function DetailConfirmationScreen({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'DetailConfirmation'>) {
  const { state, actions } = useAppStore();
  const text = getCopy(state.selectedLanguage);

  const allCriticalConfirmed =
    state.scanDraft?.document.fields.filter((field) => field.critical).every((field) => field.confirmed) ?? false;

  return (
    <ScreenLayout title={text.detailsTitle} subtitle={text.detailsSubtitle}>
      <DraftFieldList onToggle={actions.toggleDraftField} />
      <View style={styles.stack}>
        <ActionButton
          label={text.confirmDetails}
          disabled={!allCriticalConfirmed}
          onPress={() => navigation.navigate('TaskCreate')}
        />
        <ActionButton
          label={text.getHelp}
          variant="secondary"
          onPress={() => navigation.navigate('ReferralList')}
        />
      </View>
    </ScreenLayout>
  );
}

export function TaskCreateScreen({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'TaskCreate'>) {
  const { state, actions } = useAppStore();
  const text = getCopy(state.selectedLanguage);

  useEffect(() => {
    if (!state.scanDraft?.pendingTask) {
      actions.buildDraftTask();
    }
  }, [state.scanDraft?.pendingTask]);

  const task = state.scanDraft?.pendingTask;

  return (
    <ScreenLayout title={text.taskTitle} subtitle={text.taskSubtitle}>
      <SurfaceCard tone="accent" title={task?.title ?? text.taskCreated}>
        <Text style={styles.bodyText}>{task?.dueDate}</Text>
        <Text style={styles.bodyText}>{task?.reason}</Text>
      </SurfaceCard>
      <View style={styles.stack}>
        <ActionButton label={text.createReminder} onPress={() => navigation.navigate('ReferralGate')} />
        <ActionButton
          label={text.skipForNow}
          variant="secondary"
          onPress={() => {
            actions.clearDraftTask();
            navigation.replace('Completion');
          }}
        />
      </View>
    </ScreenLayout>
  );
}

export function ReferralGateScreen({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'ReferralGate'>) {
  const { state } = useAppStore();
  const text = getCopy(state.selectedLanguage);

  return (
    <ScreenLayout title={text.referralGateTitle} subtitle={text.referralGateBody}>
      <SurfaceCard tone="warning" eyebrow={text.highRisk}>
        <Text style={styles.bodyText}>{text.referralGateBody}</Text>
      </SurfaceCard>
      <View style={styles.stack}>
        <ActionButton label={text.viewTrustedHelp} onPress={() => navigation.navigate('ReferralList')} />
        <ActionButton label={text.notNow} variant="secondary" onPress={() => navigation.replace('Completion')} />
      </View>
      <Text style={styles.muted}>{state.regionLabel}</Text>
    </ScreenLayout>
  );
}

export function CompletionScreen({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'Completion'>) {
  const { state, actions } = useAppStore();
  const text = getCopy(state.selectedLanguage);
  const [persisted, setPersisted] = useState(false);

  useEffect(() => {
    if (!persisted) {
      actions.persistDraft().then(() => setPersisted(true)).catch(() => setPersisted(true));
    }
  }, [persisted]);

  const document =
    state.scanDraft?.document ??
    state.documents.find((item) => item.id === state.lastCompletedDocumentId) ??
    null;
  const explanation = document ? getExplanation(document, state.selectedLanguage) : null;

  return (
    <ScreenLayout title={text.completionTitle} subtitle={text.completionBody}>
      <SurfaceCard tone="accent" eyebrow={text.savedLocally} title={explanation?.title ?? text.nothingHere}>
        <Text style={styles.bodyText}>{text.completionBody}</Text>
        <Text style={styles.bodyText}>{state.scanDraft?.pendingTask?.title ?? text.noTasks}</Text>
      </SurfaceCard>
      <View style={styles.stack}>
        <ActionButton
          label={text.returnHome}
          onPress={() => {
            actions.discardDraft();
            navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
          }}
        />
        <ActionButton
          label={text.openTasks}
          variant="secondary"
          onPress={() => {
            actions.discardDraft();
            navigation.reset({ index: 0, routes: [{ name: 'TaskList' }] });
          }}
        />
      </View>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  bodyText: {
    color: theme.colors.text,
    fontSize: 16,
    lineHeight: 23,
  },
  stack: {
    gap: theme.spacing.sm,
  },
  previewBox: {
    minHeight: 240,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: theme.colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FBF4E8',
  },
  previewText: {
    color: theme.colors.textMuted,
    fontSize: 16,
    fontWeight: '600',
  },
  previewImage: {
    width: '100%',
    height: 300,
    borderRadius: theme.radius.md,
  },
  resultImage: {
    width: '100%',
    height: 200,
    borderRadius: theme.radius.md,
  },
  fieldCard: {
    borderRadius: theme.radius.md,
    borderWidth: 1,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    gap: 4,
  },
  fieldLabel: {
    color: theme.colors.textMuted,
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  fieldValue: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: '700',
  },
  fieldMeta: {
    color: theme.colors.textMuted,
    fontSize: 14,
  },
  muted: {
    color: theme.colors.textMuted,
    fontSize: 14,
  },
  gemmaBadge: {
    backgroundColor: '#1A73E8',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
    alignSelf: 'center',
  },
  gemmaBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'center',
  },
});