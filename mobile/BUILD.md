# Claro — Build & Deploy Guide

## Prerequisites

- Node.js 22+ (installed)
- Expo account at [expo.dev](https://expo.dev/signup)
- EAS CLI: `npm install -g eas-cli` (already available as npx)
- Android device for testing (or Android emulator)

## Quick Start (Development)

```bash
cd mobile
npm install
npx expo start
```

> **Note:** Camera, OCR, and notifications require a native build — they do NOT work in Expo Go.

## Build a Real APK

### 1. Log in to Expo

```bash
npx eas login
```

### 2. Build the APK

```bash
npx eas build --profile preview --platform android
```

This builds an installable `.apk` file in the cloud. Takes ~15 minutes on first build.

### 3. Download the APK

The terminal will show a download URL when complete. You can also find it at:
**expo.dev → Your Project → Builds → Download**

### 4. Install on a device

Transfer the APK to an Android phone and tap to install.
(Settings → Security → "Install from unknown sources" must be enabled.)

## Build Profiles

| Profile | Output | Use Case |
|---------|--------|----------|
| `development` | Dev client | Testing with hot reload |
| `preview` | `.apk` | Direct install on devices |
| `production` | `.aab` | Google Play Store submission |

## If ML Kit OCR Crashes on New Architecture

The app uses React Native's new architecture by default. If `@react-native-ml-kit/text-recognition` crashes:

1. Install expo-build-properties:
   ```bash
   npx expo install expo-build-properties
   ```

2. Add to `app.json` plugins:
   ```json
   ["expo-build-properties", { "android": { "newArchEnabled": false } }]
   ```

3. Rebuild: `npx eas build --profile preview --platform android --clear-cache`

## Regenerating App Icons

```bash
node scripts/generate-icons.js
```

Requires `sharp` (already in devDependencies).

## Distribution for Pilot

For a pilot deployment (not Play Store):

1. Build the APK with `preview` profile
2. Host the APK on any file server (GitHub Releases, Google Drive, direct URL)
3. Share the download link via QR code, SMS, or printed handout
4. Users scan/click → download → install → open

### Simple Download Page

Host a single HTML page with the download link:

```html
<!DOCTYPE html>
<html>
<head><title>Claro</title></head>
<body style="text-align:center; font-family:sans-serif; padding:40px">
  <h1>Claro</h1>
  <p>Understand your immigration documents.</p>
  <a href="YOUR_APK_URL_HERE" style="
    display:inline-block; padding:16px 32px;
    background:#1B4965; color:#F6EFE2;
    border-radius:12px; text-decoration:none;
    font-size:18px; font-weight:bold;
  ">Download for Android</a>
  <p style="margin-top:20px; color:#666; font-size:14px">
    After downloading, tap the file to install.<br>
    You may need to enable "Install from unknown sources" in Settings.
  </p>
</body>
</html>
```

## Testing Checklist

- [ ] App launches on Android device
- [ ] Language selection works (EN / ES / HT)
- [ ] Region selection saves and sorts referrals
- [ ] Camera captures a document photo
- [ ] Gallery selection works
- [ ] OCR reads text from a real document photo
- [ ] Classification correctly identifies document type
- [ ] Fields are extracted (date, court, agency)
- [ ] Explanation displays in selected language
- [ ] TTS reads explanation aloud in ES / HT
- [ ] Scam warnings appear for suspicious text
- [ ] Document saves to vault
- [ ] Task is created with correct due date
- [ ] Notification fires 1 day before due date
- [ ] Referral list shows region-appropriate orgs first
- [ ] Phone call works from referral detail
- [ ] Full wipe deletes all data + images
- [ ] App works completely offline after initial install
- [ ] Retake photo flow works for unreadable documents

## Architecture

```
App.tsx
 └─ AppProvider (state + AsyncStorage)
     └─ AppNavigator (26 screens)
         ├─ Onboarding: Language → Welcome → Region → Home
         ├─ Scan Flow: Camera → ImageReview → Processing → Result → Confirm → Tasks → Completion
         ├─ Vault: DocumentList → DocumentDetail
         ├─ Tasks: TaskList → TaskDetail
         ├─ Help: HelpHub → ReferralList → ReferralDetail
         └─ Settings: SettingsHome → Language/Safety/Freshness/About/Wipe

Services (all on-device):
 ├─ ocr.ts — ML Kit text recognition (offline, bundled Latin model)
 ├─ classifier.ts — Keyword-based document classification (8 types)
 ├─ extractor.ts — Regex field extraction (dates, courts, agencies)
 ├─ scanPipeline.ts — Orchestrates OCR → classify → extract
 ├─ imageStore.ts — Local image storage (expo-file-system)
 └─ notificationService.ts — Task reminders (expo-notifications)

Data:
 ├─ referrals.ts — 9 verified organizations with real phone numbers
 ├─ scamPatterns.ts — 5 scam detection patterns (trilingual warnings)
 ├─ regions.ts — 8 border regions for referral sorting
 └─ translations.ts — Full trilingual copy (EN/ES/HT, ~115 keys each)
```
