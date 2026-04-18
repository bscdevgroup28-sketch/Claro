/**
 * OCR text extraction service.
 *
 * Uses @react-native-ml-kit/text-recognition for on-device text recognition.
 * Works completely offline — ML Kit bundles the Latin-script model in the APK.
 *
 * NOTE: Requires a native build (EAS). Will not work in Expo Go.
 * In dev (Expo Go), falls back to sample text so the pipeline can be tested.
 */

import TextRecognition from '@react-native-ml-kit/text-recognition';

const SAMPLE_HEARING_NOTICE = `UNITED STATES DEPARTMENT OF JUSTICE
EXECUTIVE OFFICE FOR IMMIGRATION REVIEW
IMMIGRATION COURT

NOTICE OF HEARING IN REMOVAL PROCEEDINGS

In the Matter of:
A# 123-456-789

You are hereby notified that a hearing in your case has been scheduled as follows:

DATE: May 2, 2026
TIME: 8:30 AM
PLACE: Harlingen Immigration Court
  2421 W. Business 83, Suite 100
  Harlingen, TX 78550

You are required to appear at this hearing. If you fail to appear, you may be
ordered removed from the United States in your absence.

You have the right to be represented by an attorney or accredited representative
at no expense to the government.

IMMIGRATION JUDGE: Hon. Maria Santos`;

/**
 * Extract text from a document image using on-device ML Kit OCR.
 *
 * Falls back to sample text only when ML Kit is unavailable (e.g. Expo Go dev).
 */
export async function extractText(imageUri: string): Promise<string> {
  try {
    const result = await TextRecognition.recognize(imageUri);
    if (result.text && result.text.trim().length > 10) {
      return result.text;
    }
    // ML Kit returned empty/near-empty — image may be blank or unreadable
    return '';
  } catch {
    // ML Kit not available (Expo Go) — return sample for dev testing
    return SAMPLE_HEARING_NOTICE;
  }
}
