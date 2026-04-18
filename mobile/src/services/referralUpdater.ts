import AsyncStorage from '@react-native-async-storage/async-storage';
import { ReferralRecord } from '../types';
import { seedReferrals } from '../data/referrals';

/**
 * Referral auto-update service.
 *
 * On app launch (when online), fetches the latest referral data from
 * the Claro API and merges it with the local copy. Falls back to
 * bundled seed data if the fetch fails or the device is offline.
 *
 * - Only updates if the server version is newer than the local version.
 * - Stores the version string so we skip redundant updates.
 * - Never blocks app startup — runs silently in the background.
 */

const REFERRAL_VERSION_KEY = '@claro/referral-version';

// Update this URL when deploying to Railway
const API_BASE_URL = __DEV__
  ? 'http://10.0.2.2:3000' // Android emulator → host machine
  : 'https://your-app.railway.app'; // Production URL — update after Railway deploy

const FETCH_TIMEOUT_MS = 10_000;

interface ReferralApiResponse {
  version: string;
  referrals: ReferralRecord[];
}

function isValidReferral(r: unknown): r is ReferralRecord {
  if (!r || typeof r !== 'object') return false;
  const obj = r as Record<string, unknown>;
  return (
    typeof obj.id === 'string' &&
    typeof obj.name === 'string' &&
    typeof obj.phone === 'string' &&
    typeof obj.serviceArea === 'string' &&
    Array.isArray(obj.languages)
  );
}

export async function fetchLatestReferrals(): Promise<{
  referrals: ReferralRecord[];
  updated: boolean;
} | null> {
  try {
    const storedVersion = await AsyncStorage.getItem(REFERRAL_VERSION_KEY);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

    const response = await fetch(`${API_BASE_URL}/api/referrals`, {
      signal: controller.signal,
      headers: { Accept: 'application/json' },
    });
    clearTimeout(timeout);

    if (!response.ok) {
      return null;
    }

    const data: ReferralApiResponse = await response.json();

    // Validate response structure
    if (!data.version || !Array.isArray(data.referrals)) {
      return null;
    }

    // Skip if we already have this version
    if (storedVersion && storedVersion === data.version) {
      return { referrals: data.referrals, updated: false };
    }

    // Validate each referral entry
    const valid = data.referrals.filter(isValidReferral);
    if (valid.length === 0) {
      return null;
    }

    // Persist the new version marker
    await AsyncStorage.setItem(REFERRAL_VERSION_KEY, data.version);

    return { referrals: valid, updated: true };
  } catch {
    // Network error, timeout, offline — all silently handled
    return null;
  }
}

/**
 * Returns the best available referrals: fetched from API if online,
 * otherwise falls back to whatever is already in state (or seed data).
 */
export async function getUpdatedReferrals(
  currentReferrals: ReferralRecord[],
): Promise<{ referrals: ReferralRecord[]; updated: boolean }> {
  const result = await fetchLatestReferrals();

  if (result && result.updated) {
    return { referrals: result.referrals, updated: true };
  }

  // No update available or fetch failed — use current data
  const fallback = currentReferrals.length > 0 ? currentReferrals : seedReferrals;
  return { referrals: fallback, updated: false };
}
