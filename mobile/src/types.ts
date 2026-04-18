export type LanguageCode = 'en' | 'es' | 'ht';

export interface LanguageOption {
  code: LanguageCode;
  nativeLabel: string;
  englishLabel: string;
  hint: string;
}

export type DocumentSupport = 'supported' | 'unsupported';
export type UrgencyLevel = 'normal' | 'high';
export type TaskStatus = 'open' | 'done';

export interface ExplanationContent {
  title: string;
  summary: string;
  whyItMatters: string;
  nextStep: string;
  helpHint: string;
}

export interface ExtractedField {
  key: 'agency' | 'documentType' | 'eventDate' | 'location' | 'nextAction';
  value: string;
  critical: boolean;
  confirmed: boolean;
}

export interface DocumentRecord {
  id: string;
  support: DocumentSupport;
  urgency: UrgencyLevel;
  capturedAt: string;
  imageUri: string;
  imageLabel: string;
  sampleImageKey?: string;
  confidence: number;
  ocrText: string;
  explanation: Record<LanguageCode, ExplanationContent>;
  fields: ExtractedField[];
  relatedReferralIds: string[];
}

export interface TaskRecord {
  id: string;
  documentId: string;
  title: string;
  dueDate: string;
  reason: string;
  status: TaskStatus;
  createdAt: string;
  notificationId: string | null;
}

export interface ReferralRecord {
  id: string;
  name: string;
  category: string;
  serviceArea: string;
  phone: string;
  source: string;
  lastUpdated: string;
  languages: LanguageCode[];
  note: string;
  sample: boolean;
}

export interface ScanDraft {
  mode: DocumentSupport;
  imageUri: string;
  imageLabel: string;
  sampleImageKey?: string;
  ocrText: string;
  document: DocumentRecord;
  pendingTask?: TaskRecord;
  persisted: boolean;
}

export interface PersistedState {
  selectedLanguage: LanguageCode | null;
  onboardingComplete: boolean;
  regionLabel: string;
  documents: DocumentRecord[];
  tasks: TaskRecord[];
  referrals: ReferralRecord[];
  scanDraft: ScanDraft | null;
  lastCompletedDocumentId: string | null;
}

export interface AppState extends PersistedState {
  hydrated: boolean;
}