import { LanguageCode, UrgencyLevel, ExplanationContent } from '../types';

export interface ClassificationResult {
  documentType: string;
  agency: string;
  confidence: number;
  urgency: UrgencyLevel;
  explanation: Record<LanguageCode, ExplanationContent>;
}

interface DocumentPattern {
  type: string;
  agency: string;
  urgency: UrgencyLevel;
  keywords: RegExp[];
  minMatches: number;
  explanation: Record<LanguageCode, ExplanationContent>;
}

const PATTERNS: DocumentPattern[] = [
  {
    type: 'Notice of Hearing',
    agency: 'EOIR',
    urgency: 'high',
    keywords: [
      /notice\s+of\s+hearing/i,
      /hearing\s+in\s+removal/i,
      /immigration\s+court/i,
      /executive\s+office\s+for\s+immigration\s+review/i,
      /you\s+are\s+(?:hereby\s+)?required\s+to\s+appear/i,
      /immigration\s+judge/i,
    ],
    minMatches: 2,
    explanation: {
      en: {
        title: 'Immigration court hearing notice',
        summary:
          'This is a notice about a hearing scheduled in immigration court.',
        whyItMatters:
          'Missing this hearing can result in an order of removal in your absence. The date and location are critical.',
        nextStep:
          'Confirm the hearing date and location. Save this document. Contact legal help before the hearing date.',
        helpHint: 'Bring the original notice to any legal meeting.',
      },
      es: {
        title: 'Aviso de audiencia en corte de inmigración',
        summary:
          'Este es un aviso sobre una audiencia programada en la corte de inmigración.',
        whyItMatters:
          'Faltar a esta audiencia puede resultar en una orden de deportación en su ausencia. La fecha y el lugar son críticos.',
        nextStep:
          'Confirme la fecha y el lugar de la audiencia. Guarde este documento. Contacte ayuda legal antes de la fecha.',
        helpHint: 'Lleve el aviso original a cualquier reunión legal.',
      },
      ht: {
        title: 'Avi odyans tribinal imigrasyon',
        summary:
          'Sa a se yon avi sou yon odyans ki pwograme nan tribinal imigrasyon.',
        whyItMatters:
          'Si ou rate odyans sa a, sa ka lakòz yon lòd deportasyon san ou pa la. Dat la ak kote a enpòtan anpil.',
        nextStep:
          'Konfime dat ak kote odyans lan. Sove dokiman sa a. Kontakte èd legal avan dat odyans lan.',
        helpHint: 'Mennen avi orijinal la nan nenpòt rankont legal.',
      },
    },
  },
  {
    type: 'Notice to Appear (NTA)',
    agency: 'DHS',
    urgency: 'high',
    keywords: [
      /notice\s+to\s+appear/i,
      /i-862/i,
      /removal\s+proceedings/i,
      /department\s+of\s+homeland\s+security/i,
      /immigration\s+and\s+nationality\s+act/i,
      /charged\s+with\s+being\s+removable/i,
    ],
    minMatches: 2,
    explanation: {
      en: {
        title: 'Notice to Appear (Form I-862)',
        summary:
          'This is a Notice to Appear, the document that starts removal proceedings against you.',
        whyItMatters:
          'This is one of the most important immigration documents. It means the government is trying to remove you from the U.S. You have the right to defend your case.',
        nextStep:
          'Do not ignore this document. Contact a legal aid provider or accredited representative immediately.',
        helpHint:
          'Keep this document safe. You will need it for every court appearance.',
      },
      es: {
        title: 'Citatorio de comparecencia (Formulario I-862)',
        summary:
          'Este es un Citatorio de Comparecencia, el documento que inicia un proceso de deportación en su contra.',
        whyItMatters:
          'Este es uno de los documentos migratorios más importantes. Significa que el gobierno está intentando deportarlo. Usted tiene derecho a defender su caso.',
        nextStep:
          'No ignore este documento. Contacte un proveedor de ayuda legal o representante acreditado de inmediato.',
        helpHint:
          'Guarde este documento en un lugar seguro. Lo necesitará para cada comparecencia ante la corte.',
      },
      ht: {
        title: 'Avi pou parèt (Fòm I-862)',
        summary:
          'Sa a se yon Avi pou Parèt, dokiman ki kòmanse pwosedi deportasyon kont ou.',
        whyItMatters:
          'Sa a se youn nan dokiman imigrasyon ki pi enpòtan. Li vle di gouvènman an ap eseye retire ou nan peyi Etazini. Ou gen dwa defann dosye ou.',
        nextStep:
          'Pa inyore dokiman sa a. Kontakte yon sèvis èd legal oswa reprezantan akredite imedyatman.',
        helpHint:
          'Kenbe dokiman sa a an sekirite. W ap bezwen li pou chak parèt nan tribinal.',
      },
    },
  },
  {
    type: 'Order of Removal',
    agency: 'EOIR',
    urgency: 'high',
    keywords: [
      /order\s+of\s+removal/i,
      /ordered\s+removed/i,
      /order\s+of\s+the\s+immigration\s+judge/i,
      /in\s+absentia/i,
      /removal\s+order/i,
    ],
    minMatches: 1,
    explanation: {
      en: {
        title: 'Order of removal',
        summary:
          'This document appears to be an order of removal from the United States.',
        whyItMatters:
          'A removal order is extremely serious. There may be limited time to appeal or file a motion to reopen.',
        nextStep:
          'Contact a lawyer or accredited representative immediately. Do not delay. Appeal deadlines are strict.',
        helpHint:
          'Bring this document to legal help. Time-sensitive deadlines may apply.',
      },
      es: {
        title: 'Orden de deportación',
        summary:
          'Este documento parece ser una orden de deportación de los Estados Unidos.',
        whyItMatters:
          'Una orden de deportación es extremadamente seria. Puede haber tiempo limitado para apelar o presentar una moción para reabrir.',
        nextStep:
          'Contacte a un abogado o representante acreditado de inmediato. No se demore. Los plazos de apelación son estrictos.',
        helpHint:
          'Lleve este documento a ayuda legal. Pueden aplicar plazos urgentes.',
      },
      ht: {
        title: 'Lòd deportasyon',
        summary:
          'Dokiman sa a sanble se yon lòd deportasyon nan Etazini.',
        whyItMatters:
          'Yon lòd deportasyon trè grav. Ka gen tan limite pou fè apèl oswa depoze yon mosyon pou relouvri.',
        nextStep:
          'Kontakte yon avoka oswa reprezantan akredite imedyatman. Pa tann. Dat limit apèl yo estrik.',
        helpHint:
          'Mennen dokiman sa a bay èd legal. Dat limit ijan ka aplike.',
      },
    },
  },
  {
    type: 'Credible Fear Notice',
    agency: 'USCIS',
    urgency: 'high',
    keywords: [
      /credible\s+fear/i,
      /reasonable\s+fear/i,
      /asylum\s+officer/i,
      /fear\s+of\s+persecution/i,
      /fear\s+of\s+torture/i,
    ],
    minMatches: 1,
    explanation: {
      en: {
        title: 'Credible fear interview notice',
        summary:
          'This relates to a credible fear screening, an early step in the asylum process.',
        whyItMatters:
          'A credible fear interview determines whether your asylum claim moves forward. Preparation is important.',
        nextStep:
          'Prepare to explain why you fear returning to your country. Contact legal help before the interview if possible.',
        helpHint: 'A lawyer can help you prepare for this interview.',
      },
      es: {
        title: 'Aviso de entrevista de temor creíble',
        summary:
          'Esto se relaciona con una evaluación de temor creíble, un paso temprano en el proceso de asilo.',
        whyItMatters:
          'Una entrevista de temor creíble determina si su solicitud de asilo avanza. La preparación es importante.',
        nextStep:
          'Prepárese para explicar por qué teme regresar a su país. Contacte ayuda legal antes de la entrevista si es posible.',
        helpHint:
          'Un abogado puede ayudarle a prepararse para esta entrevista.',
      },
      ht: {
        title: 'Avi entèvyou krentif kredib',
        summary:
          'Sa gen rapò ak yon evalyasyon krentif kredib, yon premye etap nan pwosesis azil la.',
        whyItMatters:
          'Yon entèvyou krentif kredib detèmine si demand azil ou a avanse. Preparasyon enpòtan.',
        nextStep:
          'Prepare pou eksplike poukisa ou pè retounen nan peyi ou. Kontakte èd legal avan entèvyou a si posib.',
        helpHint: 'Yon avoka ka ede ou prepare pou entèvyou sa a.',
      },
    },
  },
  {
    type: 'Asylum Interview Notice',
    agency: 'USCIS',
    urgency: 'high',
    keywords: [
      /asylum\s+interview/i,
      /asylum\s+office/i,
      /form\s+i-589/i,
      /asylum\s+application/i,
      /affirmative\s+asylum/i,
    ],
    minMatches: 1,
    explanation: {
      en: {
        title: 'Asylum interview notice',
        summary:
          'This notice relates to your asylum interview with USCIS.',
        whyItMatters:
          'The asylum interview is a critical step. Missing it can result in denial of your case.',
        nextStep:
          'Confirm the date, time, and location. Gather your documents and evidence. Contact legal help for preparation.',
        helpHint:
          'Bring your I-589, supporting evidence, and identification.',
      },
      es: {
        title: 'Aviso de entrevista de asilo',
        summary:
          'Este aviso se relaciona con su entrevista de asilo con USCIS.',
        whyItMatters:
          'La entrevista de asilo es un paso crítico. Faltar puede resultar en la negación de su caso.',
        nextStep:
          'Confirme la fecha, hora y lugar. Reúna sus documentos y evidencia. Contacte ayuda legal para prepararse.',
        helpHint:
          'Lleve su I-589, evidencia de apoyo e identificación.',
      },
      ht: {
        title: 'Avi entèvyou azil',
        summary:
          'Avi sa a gen rapò ak entèvyou azil ou ak USCIS.',
        whyItMatters:
          'Entèvyou azil la se yon etap kritik. Si ou rate li sa ka lakòz refi dosye ou.',
        nextStep:
          'Konfime dat, lè, ak kote. Rasanble dokiman ou yo ak prèv. Kontakte èd legal pou preparasyon.',
        helpHint: 'Pote I-589 ou, prèv sipò, ak idantifikasyon.',
      },
    },
  },
  {
    type: 'Receipt Notice (I-797)',
    agency: 'USCIS',
    urgency: 'normal',
    keywords: [
      /receipt\s+number/i,
      /i-797/i,
      /receipt\s+notice/i,
      /(?:application|petition)\s+has\s+been\s+received/i,
      /uscis/i,
    ],
    minMatches: 2,
    explanation: {
      en: {
        title: 'USCIS receipt notice (I-797)',
        summary:
          'This is a receipt confirming USCIS received your application or petition.',
        whyItMatters:
          'This receipt contains your case number. Keep it safe for tracking your case status.',
        nextStep:
          'Save this document. Note the receipt number for checking case status online or by phone.',
        helpHint:
          'The receipt number usually starts with three letters (like EAC, WAC, LIN, or SRC).',
      },
      es: {
        title: 'Recibo de USCIS (I-797)',
        summary:
          'Este es un recibo que confirma que USCIS recibió su solicitud o petición.',
        whyItMatters:
          'Este recibo contiene su número de caso. Guárdelo de forma segura para rastrear el estado de su caso.',
        nextStep:
          'Guarde este documento. Anote el número de recibo para verificar el estado de su caso en línea o por teléfono.',
        helpHint:
          'El número de recibo generalmente empieza con tres letras (como EAC, WAC, LIN o SRC).',
      },
      ht: {
        title: 'Resi USCIS (I-797)',
        summary:
          'Sa a se yon resi ki konfime USCIS resevwa aplikasyon oswa petisyon ou.',
        whyItMatters:
          'Resi sa a gen nimewo dosye ou. Kenbe li an sekirite pou swiv estati dosye ou.',
        nextStep:
          'Sove dokiman sa a. Note nimewo resi a pou tcheke estati dosye ou sou entènèt oswa pa telefòn.',
        helpHint:
          'Nimewo resi a anjeneral kòmanse ak twa lèt (tankou EAC, WAC, LIN, oswa SRC).',
      },
    },
  },
  {
    type: 'Bond Hearing Notice',
    agency: 'EOIR',
    urgency: 'high',
    keywords: [
      /bond\s+hearing/i,
      /bond\s+redetermination/i,
      /custody\s+hearing/i,
      /bond\s+amount/i,
    ],
    minMatches: 1,
    explanation: {
      en: {
        title: 'Bond hearing notice',
        summary:
          'This notice is about a bond hearing, which determines if you can be released from detention.',
        whyItMatters:
          'A bond hearing is your chance to be released while your case continues. Missing it could mean staying in detention.',
        nextStep:
          'Contact a lawyer immediately. Gather evidence of ties to the community and that you are not a flight risk.',
        helpHint:
          'Letters from family, proof of address, and employment can help your case.',
      },
      es: {
        title: 'Aviso de audiencia de fianza',
        summary:
          'Este aviso es sobre una audiencia de fianza, que determina si puede ser liberado de la detención.',
        whyItMatters:
          'Una audiencia de fianza es su oportunidad de ser liberado mientras su caso continúa. Faltar podría significar permanecer detenido.',
        nextStep:
          'Contacte a un abogado de inmediato. Reúna evidencia de lazos con la comunidad y de que no es un riesgo de fuga.',
        helpHint:
          'Cartas de familia, comprobante de domicilio y empleo pueden ayudar su caso.',
      },
      ht: {
        title: 'Avi odyans kosyon',
        summary:
          'Avi sa a konsènen yon odyans kosyon, ki detèmine si ou ka libere nan detansyon.',
        whyItMatters:
          'Yon odyans kosyon se chans ou pou libere pandan dosye ou kontinye. Si ou rate li sa ka vle di rete nan detansyon.',
        nextStep:
          'Kontakte yon avoka imedyatman. Rasanble prèv lyen ou ak kominote a ak ke ou pa yon risk.',
        helpHint:
          'Lèt fanmi, prèv adrès, ak travay ka ede dosye ou.',
      },
    },
  },
  {
    type: 'Work Authorization (EAD)',
    agency: 'USCIS',
    urgency: 'normal',
    keywords: [
      /employment\s+authorization/i,
      /i-766/i,
      /work\s+permit/i,
      /\bead\b/i,
      /authorized\s+to\s+work/i,
    ],
    minMatches: 1,
    explanation: {
      en: {
        title: 'Employment Authorization Document (EAD)',
        summary:
          'This document relates to your work authorization in the United States.',
        whyItMatters:
          'An EAD allows you to work legally. Check the expiration date and renew before it expires.',
        nextStep:
          'Note the expiration date. If it expires soon, file for renewal (Form I-765) well in advance.',
        helpHint: 'You can check processing times at USCIS.gov.',
      },
      es: {
        title: 'Documento de Autorización de Empleo (EAD)',
        summary:
          'Este documento se relaciona con su autorización de trabajo en los Estados Unidos.',
        whyItMatters:
          'Un EAD le permite trabajar legalmente. Verifique la fecha de vencimiento y renueve antes de que expire.',
        nextStep:
          'Anote la fecha de vencimiento. Si expira pronto, solicite la renovación (Formulario I-765) con anticipación.',
        helpHint:
          'Puede verificar los tiempos de procesamiento en USCIS.gov.',
      },
      ht: {
        title: 'Dokiman Otorizasyon Travay (EAD)',
        summary:
          'Dokiman sa a gen rapò ak otorizasyon travay ou nan Etazini.',
        whyItMatters:
          'Yon EAD pèmèt ou travay legalman. Tcheke dat ekspirasyon an epi renouvle avan li ekspire.',
        nextStep:
          'Note dat ekspirasyon an. Si li ekspire byento, depoze pou renouvèlman (Fòm I-765) byen avan.',
        helpHint: 'Ou ka tcheke tan tretman nan USCIS.gov.',
      },
    },
  },
];

const UNCERTAIN: ClassificationResult = {
  documentType: 'Uncertain document',
  agency: 'Unknown',
  confidence: 0.15,
  urgency: 'high',
  explanation: {
    en: {
      title: 'Uncertain document',
      summary:
        'The app could not identify this document with enough confidence.',
      whyItMatters:
        'If this is an official document, acting on an incorrect explanation could cause harm.',
      nextStep:
        'Do not rely on this result. Contact trusted legal help with the original document.',
      helpHint:
        'Show the original paper to a lawyer or accredited representative.',
    },
    es: {
      title: 'Documento incierto',
      summary:
        'La aplicación no pudo identificar este documento con suficiente confianza.',
      whyItMatters:
        'Si este es un documento oficial, actuar según una explicación incorrecta podría causar daño.',
      nextStep:
        'No confíe en este resultado. Contacte ayuda legal confiable con el documento original.',
      helpHint:
        'Muestre el papel original a un abogado o representante acreditado.',
    },
    ht: {
      title: 'Dokiman ki pa sèten',
      summary:
        'Aplikasyon an pa t kapab idantifye dokiman sa a ak ase konfyans.',
      whyItMatters:
        'Si sa a se yon dokiman ofisyèl, aji sou yon move eksplikasyon ka lakòz danje.',
      nextStep:
        'Pa konte sou rezilta sa a. Kontakte èd legal ou ka fè konfyans ak dokiman orijinal la.',
      helpHint:
        'Montre papye orijinal la bay yon avoka oswa reprezantan akredite.',
    },
  },
};

/**
 * Classify a document based on OCR-extracted text.
 *
 * Uses deterministic keyword matching against known immigration document patterns.
 * Works entirely offline — no AI model required.
 */
export function classifyDocument(text: string): ClassificationResult {
  if (!text || text.trim().length < 20) {
    return UNCERTAIN;
  }

  let bestMatch: { pattern: DocumentPattern; score: number } | null = null;

  for (const pattern of PATTERNS) {
    let matches = 0;
    for (const keyword of pattern.keywords) {
      // Reset lastIndex for stateful regexes
      keyword.lastIndex = 0;
      if (keyword.test(text)) {
        matches++;
      }
    }

    if (matches >= pattern.minMatches) {
      const score = matches / pattern.keywords.length;
      if (!bestMatch || score > bestMatch.score) {
        bestMatch = { pattern, score };
      }
    }
  }

  if (!bestMatch) {
    return UNCERTAIN;
  }

  const confidence = Math.min(0.95, 0.5 + bestMatch.score * 0.5);

  return {
    documentType: bestMatch.pattern.type,
    agency: bestMatch.pattern.agency,
    confidence,
    urgency: bestMatch.pattern.urgency,
    explanation: bestMatch.pattern.explanation,
  };
}
