import { classifyDocument } from './classifier';
import { extractFields } from './extractor';
import { analyzeWithGemma } from './gemmaAnalyzer';
import { extractText } from './ocr';
import { saveDocumentImage } from './imageStore';
import { DocumentRecord, ScanDraft } from '../types';

function makeId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
}

/**
 * Full scan pipeline: save image → OCR → classify → extract fields → build draft.
 *
 * Works entirely on-device. In a native build (EAS), ML Kit runs real OCR.
 * In Expo Go dev, falls back to sample text for pipeline testing.
 */
export async function processScan(imageUri: string): Promise<ScanDraft> {
  // 1. Save image to persistent local storage
  const savedImageUri = await saveDocumentImage(imageUri);

  // 2. Extract text via OCR
  const ocrText = await extractText(imageUri);

  // 3. Handle unreadable documents
  if (!ocrText || ocrText.trim().length < 15) {
    const unreadableDoc: DocumentRecord = {
      id: makeId('doc'),
      support: 'unsupported',
      urgency: 'high',
      capturedAt: new Date().toISOString(),
      imageUri: savedImageUri,
      imageLabel: 'Unreadable document',
      confidence: 0,
      ocrText: ocrText || '',
      explanation: {
        en: {
          title: 'Could not read this document',
          summary: 'The app could not read enough text from this photo.',
          whyItMatters: 'Without readable text, the app cannot safely explain what this document says.',
          nextStep: 'Try taking another photo with better lighting, or show the original document to trusted legal help.',
          helpHint: 'Make sure the entire document is visible and the text is not blurry.',
        },
        es: {
          title: 'No se pudo leer este documento',
          summary: 'La aplicación no pudo leer suficiente texto de esta foto.',
          whyItMatters: 'Sin texto legible, la aplicación no puede explicar con seguridad lo que dice este documento.',
          nextStep: 'Intente tomar otra foto con mejor iluminación, o muestre el documento original a ayuda legal confiable.',
          helpHint: 'Asegúrese de que todo el documento sea visible y el texto no esté borroso.',
        },
        ht: {
          title: 'Pa t kapab li dokiman sa a',
          summary: 'Aplikasyon an pa t kapab li ase tèks nan foto sa a.',
          whyItMatters: 'San tèks lizib, aplikasyon an pa ka esplike san danje sa dokiman sa a di.',
          nextStep: 'Eseye pran yon lòt foto ak pi bon limyè, oswa montre dokiman orijinal la bay èd legal ou ka fè konfyans.',
          helpHint: 'Asire tout dokiman an vizib epi tèks la pa flou.',
        },
      },
      fields: [],
      relatedReferralIds: [],
    };
    return {
      mode: 'unsupported',
      imageUri: savedImageUri,
      imageLabel: 'Unreadable document',
      ocrText: ocrText || '',
      document: unreadableDoc,
      pendingTask: undefined,
      persisted: false,
    };
  }

  // 4. Try Gemma 4 analysis first (server-side AI), fall back to local regex
  const gemmaResult = await analyzeWithGemma(ocrText);

  let document: DocumentRecord;

  if (gemmaResult) {
    // ── Gemma 4 path ──
    const isSupported = gemmaResult.confidence >= 0.6;
    document = {
      id: makeId('doc'),
      support: isSupported ? 'supported' : 'unsupported',
      urgency: gemmaResult.urgency,
      capturedAt: new Date().toISOString(),
      imageUri: savedImageUri,
      imageLabel: gemmaResult.documentType,
      confidence: gemmaResult.confidence,
      ocrText,
      explanation: gemmaResult.explanation,
      fields: gemmaResult.fields,
      relatedReferralIds: [],
    };

    return {
      mode: isSupported ? 'supported' : 'unsupported',
      imageUri: savedImageUri,
      imageLabel: gemmaResult.documentType,
      ocrText,
      document,
      pendingTask: undefined,
      persisted: false,
      gemmaModel: gemmaResult.model,
      scamWarnings: gemmaResult.scamWarnings,
    };
  }

  // ── Local fallback path (offline / server unavailable) ──

  // 5. Classify document type
  const classification = classifyDocument(ocrText);

  // 6. Extract structured fields
  const fields = extractFields(ocrText, classification);

  // 7. Determine support level
  const isSupported = classification.confidence >= 0.6;

  // 8. Build the document record
  document = {
    id: makeId('doc'),
    support: isSupported ? 'supported' : 'unsupported',
    urgency: classification.urgency,
    capturedAt: new Date().toISOString(),
    imageUri: savedImageUri,
    imageLabel: classification.documentType,
    confidence: classification.confidence,
    ocrText,
    explanation: classification.explanation,
    fields,
    relatedReferralIds: [],
  };

  // 9. Return scan draft
  return {
    mode: isSupported ? 'supported' : 'unsupported',
    imageUri: savedImageUri,
    imageLabel: classification.documentType,
    ocrText,
    document,
    pendingTask: undefined,
    persisted: false,
  };
}
