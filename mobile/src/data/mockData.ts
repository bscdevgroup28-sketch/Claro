import {
  DocumentRecord,
  LanguageCode,
  PersistedState,
  ScanDraft,
  TaskRecord,
} from '../types';
import { seedReferrals } from './referrals';

function makeId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
}

export { seedReferrals };

export const defaultPersistedState: PersistedState = {
  selectedLanguage: null,
  onboardingComplete: false,
  regionLabel: 'Rio Grande Valley',
  documents: [],
  tasks: [],
  referrals: seedReferrals,
  scanDraft: null,
  lastCompletedDocumentId: null,
};

function supportedExplanation() {
  return {
    en: {
      title: 'Immigration court hearing notice',
      summary:
        'This appears to be a hearing notice connected to immigration court.',
      whyItMatters:
        'Missing this hearing can create serious legal risk. The date and place matter.',
      nextStep:
        'Confirm the hearing date, save the notice, and plan to speak with trusted legal help soon.',
      helpHint:
        'Bring the original notice to any legal meeting or intake.',
    },
    es: {
      title: 'Aviso de audiencia en corte de inmigracion',
      summary:
        'Este documento parece ser un aviso de audiencia relacionado con la corte de inmigracion.',
      whyItMatters:
        'Faltar a esta audiencia puede crear un riesgo legal serio. La fecha y el lugar importan.',
      nextStep:
        'Confirma la fecha de la audiencia, guarda el aviso y planea hablar pronto con ayuda legal confiable.',
      helpHint:
        'Lleva el aviso original a cualquier reunion legal o de orientacion.',
    },
    ht: {
      title: 'Avi odyans tribinal imigrasyon',
      summary:
        'Dokiman sa a sanble ak yon avi odyans ki gen rapò ak tribinal imigrasyon.',
      whyItMatters:
        'Si ou rate odyans sa a sa ka kreye gwo risk legal. Dat la ak kote a enpòtan.',
      nextStep:
        'Konfime dat odyans lan, sove avi a, epi planifye pou pale ak èd legal ou ka fè konfyans byen vit.',
      helpHint:
        'Mennen avi orijinal la nan nenpòt rankont legal oswa admisyon.',
    },
  } satisfies Record<LanguageCode, DocumentRecord['explanation'][LanguageCode]>;
}

function unsupportedExplanation() {
  return {
    en: {
      title: 'Uncertain document',
      summary: 'The app is not confident enough to explain this paper safely.',
      whyItMatters:
        'A wrong explanation could cause harm. It is safer to stop and get trusted help.',
      nextStep:
        'Save the paper if needed, then contact a verified referral.',
      helpHint: 'Use the original document when you contact a provider.',
    },
    es: {
      title: 'Documento incierto',
      summary: 'La aplicacion no tiene suficiente confianza para explicar este papel con seguridad.',
      whyItMatters:
        'Una explicacion incorrecta puede causar dano. Es mas seguro detenerse y buscar ayuda confiable.',
      nextStep:
        'Guarda el papel si lo necesitas y luego contacta una referencia verificada.',
      helpHint: 'Usa el documento original cuando contactes a un proveedor.',
    },
    ht: {
      title: 'Dokiman ki pa sèten',
      summary: 'Aplikasyon an pa gen ase konfyans pou esplike papye sa a san danje.',
      whyItMatters:
        'Yon move eksplikasyon ka fè moun mal. Li pi an sekirite pou sispann epi chèche èd ou ka fè konfyans.',
      nextStep:
        'Sove papye a si sa nesesè, epi kontakte yon referans verifye.',
      helpHint: 'Sèvi ak dokiman orijinal la lè ou kontakte yon sèvis.',
    },
  } satisfies Record<LanguageCode, DocumentRecord['explanation'][LanguageCode]>;
}

export function createSupportedDraft(): ScanDraft {
  const documentId = makeId('doc');

  return {
    mode: 'supported',
    imageUri: '',
    imageLabel: 'Sample hearing notice image',
    ocrText: 'NOTICE OF HEARING IN REMOVAL PROCEEDINGS (demo)',
    persisted: false,
    document: {
      id: documentId,
      support: 'supported',
      urgency: 'high',
      capturedAt: new Date().toISOString(),
      imageUri: '',
      imageLabel: 'Sample hearing notice image',
      confidence: 0.94,
      ocrText: 'NOTICE OF HEARING IN REMOVAL PROCEEDINGS (demo)',
      explanation: supportedExplanation(),
      relatedReferralIds: seedReferrals.map((item) => item.id),
      fields: [
        { key: 'agency', value: 'EOIR', critical: false, confirmed: true },
        {
          key: 'documentType',
          value: 'Notice of hearing',
          critical: false,
          confirmed: true,
        },
        {
          key: 'eventDate',
          value: 'May 2, 2026 at 8:30 AM',
          critical: true,
          confirmed: false,
        },
        {
          key: 'location',
          value: 'Harlingen Immigration Court',
          critical: true,
          confirmed: false,
        },
        {
          key: 'nextAction',
          value: 'Attend the hearing and bring the original notice.',
          critical: true,
          confirmed: false,
        },
      ],
    },
  };
}

export function createUnsupportedDraft(): ScanDraft {
  return {
    mode: 'unsupported',
    imageUri: '',
    imageLabel: 'Sample uncertain document image',
    ocrText: '[partially obscured text] (demo)',
    persisted: false,
    document: {
      id: makeId('doc'),
      support: 'unsupported',
      urgency: 'high',
      capturedAt: new Date().toISOString(),
      imageUri: '',
      imageLabel: 'Sample uncertain document image',
      confidence: 0.42,
      ocrText: '[partially obscured text] (demo)',
      explanation: unsupportedExplanation(),
      relatedReferralIds: seedReferrals.map((item) => item.id),
      fields: [
        { key: 'agency', value: 'Unknown', critical: false, confirmed: false },
        {
          key: 'documentType',
          value: 'Unknown notice',
          critical: false,
          confirmed: false,
        },
        { key: 'eventDate', value: 'Unclear', critical: true, confirmed: false },
        { key: 'location', value: 'Unclear', critical: true, confirmed: false },
        {
          key: 'nextAction',
          value: 'Do not rely on this result alone.',
          critical: true,
          confirmed: false,
        },
      ],
    },
  };
}

export function createTaskFromDocument(document: DocumentRecord): TaskRecord {
  const eventDate = document.fields.find((field) => field.key === 'eventDate')?.value ?? 'Unknown date';
  const nextAction =
    document.fields.find((field) => field.key === 'nextAction')?.value ??
    'Review the document and seek help if needed.';

  return {
    id: makeId('task'),
    documentId: document.id,
    title: 'Prepare for your hearing',
    dueDate: eventDate,
    reason: nextAction,
    status: 'open',
    createdAt: new Date().toISOString(),
    notificationId: null,
  };
}

export function getExplanation(document: DocumentRecord, language: LanguageCode | null) {
  return document.explanation[language ?? 'en'];
}