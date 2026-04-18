import { ClassificationResult } from './classifier';
import { ExtractedField } from '../types';

/* ───── regex patterns ───── */

const FULL_DATE =
  /(?:january|february|march|april|may|june|july|august|september|october|november|december)\s+\d{1,2},?\s+\d{4}/gi;
const SLASH_DATE = /\b(\d{1,2})\/(\d{1,2})\/(\d{2,4})\b/g;
const ISO_DATE = /\b(\d{4})-(\d{2})-(\d{2})\b/g;
const TIME_AMPM = /\b\d{1,2}:\d{2}\s*(?:AM|PM|a\.m\.|p\.m\.)\b/gi;

const AGENCIES: Record<string, RegExp> = {
  EOIR: /executive\s+office\s+for\s+immigration\s+review|\beoir\b/i,
  USCIS: /u\.?s\.?\s*citizenship\s+and\s+immigration\s+services|\buscis\b/i,
  ICE: /immigration\s+and\s+customs\s+enforcement|\bice\b/i,
  CBP: /customs\s+and\s+border\s+protection|\bcbp\b/i,
  DHS: /department\s+of\s+homeland\s+security|\bdhs\b/i,
};

const KNOWN_COURTS = [
  'Harlingen Immigration Court',
  'San Antonio Immigration Court',
  'Houston Immigration Court',
  'Dallas Immigration Court',
  'El Paso Immigration Court',
  'Los Angeles Immigration Court',
  'San Francisco Immigration Court',
  'New York Immigration Court',
  'Miami Immigration Court',
  'Chicago Immigration Court',
  'Arlington Immigration Court',
  'Phoenix Immigration Court',
  'San Diego Immigration Court',
  'Denver Immigration Court',
  'Atlanta Immigration Court',
  'Baltimore Immigration Court',
  'Boston Immigration Court',
  'Cleveland Immigration Court',
  'Detroit Immigration Court',
  'Newark Immigration Court',
  'Philadelphia Immigration Court',
  'Portland Immigration Court',
  'Seattle Immigration Court',
  'Brownsville Immigration Court',
  'Fort Lauderdale Immigration Court',
  'Orlando Immigration Court',
  'Tampa Immigration Court',
  'Jacksonville Immigration Court',
];

/* ───── helpers ───── */

function execAll(pattern: RegExp, text: string): string[] {
  const results: string[] = [];
  const re = new RegExp(pattern.source, pattern.flags);
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    results.push(m[0]);
  }
  return results;
}

function findDates(text: string): string[] {
  return [
    ...execAll(FULL_DATE, text),
    ...execAll(SLASH_DATE, text),
    ...execAll(ISO_DATE, text),
  ];
}

function findTimes(text: string): string[] {
  return execAll(TIME_AMPM, text);
}

function findAgency(text: string): string {
  for (const [name, pattern] of Object.entries(AGENCIES)) {
    pattern.lastIndex = 0;
    if (pattern.test(text)) {
      return name;
    }
  }
  return 'Unknown';
}

function findLocation(text: string): string {
  const lower = text.toLowerCase();
  for (const court of KNOWN_COURTS) {
    if (lower.includes(court.toLowerCase())) {
      return court;
    }
  }

  // Generic court reference
  const courtMatch = text.match(
    /(\w+(?:\s+\w+)*\s+Immigration\s+Court)/i,
  );
  if (courtMatch) return courtMatch[1];

  // Address pattern
  const addrMatch = text.match(
    /\d+\s+\w+(?:\s+\w+)*(?:\s+(?:St|Ave|Blvd|Rd|Dr|Suite|Ste))/i,
  );
  if (addrMatch) return addrMatch[0];

  return 'See document';
}

function nextActionForType(docType: string): string {
  const map: Record<string, string> = {
    'Notice of Hearing':
      'Attend the hearing on the scheduled date. Bring the original notice and any evidence.',
    'Notice to Appear (NTA)':
      'Contact a legal representative immediately. Do not ignore this document.',
    'Order of Removal':
      'Seek legal help urgently. There may be a deadline to appeal.',
    'Credible Fear Notice':
      'Prepare for the credible fear interview. Contact legal help for preparation.',
    'Asylum Interview Notice':
      'Prepare documents and evidence for the asylum interview.',
    'Receipt Notice (I-797)':
      'Save this receipt. Use the receipt number to track your case status.',
    'Bond Hearing Notice':
      'Contact a lawyer to prepare for the bond hearing.',
    'Work Authorization (EAD)':
      'Check the expiration date. File for renewal well before it expires.',
  };
  return map[docType] ?? 'Contact trusted legal help with this document.';
}

/* ───── public ───── */

/**
 * Extract structured fields from OCR text given a classification.
 *
 * Returns the standard five-field set: agency, documentType, eventDate,
 * location, and nextAction.
 */
export function extractFields(
  text: string,
  classification: ClassificationResult,
): ExtractedField[] {
  const agency =
    classification.agency !== 'Unknown'
      ? classification.agency
      : findAgency(text);

  const dates = findDates(text);
  const times = findTimes(text);
  let eventDate = dates.length > 0 ? dates[0] : 'Not found';
  if (times.length > 0 && dates.length > 0) {
    eventDate = `${dates[0]} at ${times[0]}`;
  }

  const location = findLocation(text);

  return [
    {
      key: 'agency',
      value: agency,
      critical: false,
      confirmed: agency !== 'Unknown',
    },
    {
      key: 'documentType',
      value: classification.documentType,
      critical: false,
      confirmed: classification.confidence >= 0.7,
    },
    {
      key: 'eventDate',
      value: eventDate,
      critical: true,
      confirmed: false,
    },
    {
      key: 'location',
      value: location,
      critical: true,
      confirmed: false,
    },
    {
      key: 'nextAction',
      value: nextActionForType(classification.documentType),
      critical: true,
      confirmed: false,
    },
  ];
}
