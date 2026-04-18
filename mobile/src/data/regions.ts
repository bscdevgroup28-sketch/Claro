import { ReferralRecord } from '../types';

/**
 * Regions a user can select during onboarding or settings.
 * Used to sort referrals — local orgs first, then national hotlines.
 */
export const REGIONS = [
  { id: 'rio-grande-valley', label: 'Rio Grande Valley, TX' },
  { id: 'brownsville', label: 'Brownsville, TX' },
  { id: 'el-paso', label: 'El Paso, TX' },
  { id: 'san-antonio', label: 'San Antonio, TX' },
  { id: 'south-texas', label: 'South Texas (other)' },
  { id: 'miami', label: 'Miami-Dade, FL' },
  { id: 'broward', label: 'Broward County, FL' },
  { id: 'palm-beach', label: 'Palm Beach County, FL' },
  { id: 'south-florida', label: 'South Florida (other)' },
  { id: 'arizona', label: 'Arizona' },
  { id: 'california', label: 'California' },
  { id: 'other', label: 'Other / Not sure' },
] as const;

export type RegionId = (typeof REGIONS)[number]['id'];

/**
 * Sort referrals so region-relevant entries appear first.
 *
 * Logic:
 * 1. Exact match to the user's region
 * 2. Partial text match (e.g. "South Texas" matches "Rio Grande Valley" area)
 * 3. National-scope referrals
 * 4. Everything else
 */
export function sortReferralsByRegion(
  referrals: ReferralRecord[],
  regionLabel: string,
): ReferralRecord[] {
  const lower = regionLabel.toLowerCase();

  function score(r: ReferralRecord): number {
    const area = r.serviceArea.toLowerCase();
    if (area === lower) return 0; // exact
    if (area.includes(lower) || lower.includes(area)) return 1; // partial
    if (area.includes('texas') && lower.includes('texas')) return 2; // same state
    if (area.includes('florida') && lower.includes('florida')) return 2; // same state
    if (area.includes('south florida') && (lower.includes('miami') || lower.includes('broward') || lower.includes('palm beach'))) return 1;
    if (area === 'national') return 3; // hotlines
    return 4; // everything else
  }

  return [...referrals].sort((a, b) => score(a) - score(b));
}
