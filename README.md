# Claro

**Understand your immigration documents — instantly, privately, in your language.**

Claro is a free, open-source mobile app that helps immigrants understand their legal documents. Point your phone camera at any immigration paper and get a plain-language explanation in English, Spanish, or Haitian Creole — all processed on-device, with no data leaving your phone.

## The Problem

Millions of immigrants in the United States receive complex legal documents they cannot fully understand. Language barriers, lack of affordable legal help, and fear of scams leave people vulnerable — missing deadlines, falling for fraud, or failing to act on critical notices.

## What Claro Does

- **Scan & Classify** — Photograph any immigration document. On-device OCR and an 8-type classifier instantly identify what you're holding (NTA, EAD, hearing notice, asylum receipt, and more).
- **Plain-Language Explanation** — Every document gets a clear, jargon-free summary explaining what it means, what's required, and what deadlines matter.
- **Trilingual** — Full support for English, Spanish, and Haitian Creole.
- **Deadline Alerts** — Automatic reminders for court dates, filing deadlines, and document expirations.
- **Trusted Referrals** — Curated list of verified legal aid organizations, filterable by region, with auto-updating data.
- **Scam Detection** — Flags common immigration scam patterns found in documents.
- **100% Private** — All scanning and analysis happens on-device. No cloud uploads. No accounts. No tracking.

## Architecture

```
mobile/          Expo SDK 54 + React Native (TypeScript)
  ├── src/
  │   ├── screens/       Home, Scan, Vault, Tasks, Help, Settings
  │   ├── services/      OCR, classifier, field extractor, scan pipeline
  │   ├── data/          Referrals, regions, translations, scam patterns
  │   └── context/       App state with AsyncStorage persistence
  └── assets/            App icons, splash screen

web/             Express.js landing page + API
  ├── index.html         Trilingual landing page with Stripe donations
  ├── server.js          Static server + /api/referrals endpoint
  └── data/              Versioned referral data (auto-update source)

docs/            Product specs, research, architecture, safety framework
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Mobile | Expo SDK 54, React Native 0.81, TypeScript 5.9 |
| OCR | Google ML Kit (on-device) |
| State | React Context + AsyncStorage (local-first) |
| Notifications | expo-notifications (local scheduling) |
| Landing Page | Express.js, vanilla HTML/CSS/JS |
| Hosting | Railway (web), EAS (mobile builds) |
| Donations | Stripe Payment Links |

## Getting Started

### Mobile App

```bash
cd mobile
npm install
npx expo start
```

Scan the QR code with Expo Go, or build an APK:

```bash
npx eas-cli build --profile preview --platform android
```

### Web / Landing Page

```bash
cd web
npm install
node server.js
```

The server starts on the port defined by `PORT` (default 3000).

## Download

**Android APK** — Available via [Expo EAS builds](https://expo.dev/accounts/bscdevgroups-organization/projects/claro/builds)

## Supported Document Types

1. Notice to Appear (NTA)
2. Employment Authorization Document (EAD)
3. Hearing Notice / Court Date
4. Asylum Receipt Notice (I-589)
5. Bond Notice
6. Order of Removal / Deportation Order
7. Change of Venue Notice
8. Request for Evidence (RFE)

## Supported Regions

- New York City, Long Island, Upstate NY
- New Jersey, Connecticut, Pennsylvania
- Miami-Dade, Broward, Palm Beach, South Florida
- Other US locations

## Privacy

Claro is designed with privacy as a core principle:

- **No cloud processing** — All OCR and document analysis runs on-device
- **No accounts** — No sign-up, no login, no personal data collection
- **No tracking** — No analytics, no telemetry, no third-party SDKs
- **Local storage only** — Documents and scans stay on your phone
- **Open source** — Full codebase is auditable

## Contributing

Contributions are welcome. Areas where help is needed:

- Additional language translations
- More document type classifiers
- Legal aid referral data for new regions
- Accessibility improvements
- iOS testing and refinement

## License

MIT

## Built For

[Gemma 4 Good Hackathon](https://ai.google.dev/) — Using AI to create positive social impact for immigrant communities.

---

*Claro means "clear" in Spanish — because everyone deserves to understand the documents that shape their future.*
