import { LanguageCode } from '../types';

export interface ScamWarning {
  id: string;
  trigger: RegExp;
  severity: 'warning' | 'danger';
  message: Record<LanguageCode, string>;
}

/**
 * Scam detection patterns based on common immigration fraud tactics.
 * Sources: USA.gov/immigration-scams, DOJ fraud warnings, FTC consumer alerts.
 */
export const scamPatterns: ScamWarning[] = [
  {
    id: 'notario-fraud',
    trigger: /notari[ao]|notary\s+public.*immigra/i,
    severity: 'danger',
    message: {
      en: 'Warning: A "notario" or notary public is NOT a lawyer in the U.S. Do not pay a notario for immigration help. Only a licensed attorney or DOJ-accredited representative can represent you.',
      es: 'Advertencia: Un "notario público" NO es abogado en EE.UU. No pague a un notario por ayuda migratoria. Solo un abogado con licencia o representante acreditado por el DOJ puede representarlo.',
      ht: 'Avètisman: Yon "notè piblik" PA yon avoka nan Etazini. Pa peye yon notè pou èd imigrasyon. Sèlman yon avoka ki gen lisans oswa reprezantan DOJ akredite ka reprezante ou.',
    },
  },
  {
    id: 'guaranteed-outcome',
    trigger:
      /guarantee[ds]?\s+(?:your|the|a)?\s*(?:case|approval|visa|green\s*card|asylum|status)/i,
    severity: 'danger',
    message: {
      en: 'No one can guarantee an immigration outcome. Anyone who promises guaranteed approval is likely a scam.',
      es: 'Nadie puede garantizar un resultado migratorio. Cualquiera que prometa aprobación garantizada probablemente es una estafa.',
      ht: 'Pèsonn pa ka garanti yon rezilta imigrasyon. Nenpòt moun ki pwomèt apwobasyon garanti pwobableman se yon anak.',
    },
  },
  {
    id: 'urgent-payment',
    trigger:
      /pay\s+(?:now|immediately|today).*(?:deport|remove|arrest)|(?:deport|remove|arrest).*pay\s+(?:now|immediately|today)/i,
    severity: 'danger',
    message: {
      en: 'Government agencies do not call or text demanding immediate payment to avoid deportation. This is likely a scam.',
      es: 'Las agencias del gobierno no llaman ni envían mensajes exigiendo pago inmediato para evitar la deportación. Esto probablemente es una estafa.',
      ht: 'Ajans gouvènman pa rele oswa voye mesaj mande peman imedya pou evite deportasyon. Sa pwobableman se yon anak.',
    },
  },
  {
    id: 'fake-official',
    trigger:
      /(?:special|secret|inside)\s+(?:program|connection|contact).*(?:uscis|ice|immigration|government)/i,
    severity: 'warning',
    message: {
      en: 'Be cautious of anyone claiming special connections inside immigration agencies. Legitimate help does not require special access.',
      es: 'Tenga cuidado con cualquiera que afirme tener conexiones especiales dentro de las agencias de inmigración. La ayuda legítima no requiere acceso especial.',
      ht: 'Fè atansyon ak nenpòt moun ki di li gen koneksyon espesyal nan ajans imigrasyon. Èd lejitim pa bezwen aksè espesyal.',
    },
  },
  {
    id: 'cash-only',
    trigger: /cash\s+only|no\s+receipt|don'?t\s+need\s+(?:a\s+)?receipt/i,
    severity: 'warning',
    message: {
      en: 'Legitimate legal providers give receipts and written agreements. Cash-only with no receipt is a red flag.',
      es: 'Los proveedores legales legítimos dan recibos y acuerdos escritos. Solo efectivo sin recibo es una señal de alerta.',
      ht: 'Sèvis legal lejitim bay resi ak akò ekri. Sèlman lajan kach san resi se yon siy danje.',
    },
  },
];

/**
 * Scan text for known scam patterns and return matching warnings.
 */
export function detectScamWarnings(text: string): ScamWarning[] {
  if (!text) return [];
  return scamPatterns.filter((p) => {
    p.trigger.lastIndex = 0;
    return p.trigger.test(text);
  });
}
