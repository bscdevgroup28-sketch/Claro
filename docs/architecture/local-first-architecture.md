# ICE Assist Local-First Architecture

## Recommendation

Build an Android-first mobile app using React Native with TypeScript and a custom native-capable setup rather than a pure web app.

## Why this is the right starting point

- mobile delivery matches the real usage environment
- cross-platform code reuse keeps future iOS support open
- TypeScript improves speed and readability for a small team
- native modules can handle OCR, secure storage, camera access, and notifications
- a pure PWA is weaker on offline file access, device integration, background behavior, and distribution in constrained environments

## Platform recommendation

### App shell

- React Native
- TypeScript
- Expo prebuild or custom dev client approach so native modules remain available

### Local data layer

- SQLite for structured local data
- encrypted file vault for document images
- secure OS storage for encryption keys and small secrets

### Device capabilities

- camera capture
- local notifications
- optional app lock

## Core architecture principle

The app should still deliver its main value when the network is absent. Networking should update content bundles, not gate the core user flow.

## System components

## 1. Capture layer

Handles camera intake, image quality checks, cropping, rotation, and local save.

## 2. OCR layer

Runs on-device text recognition for supported documents. Start with a mature on-device OCR engine and only add heavier ML if real documents prove it necessary.

## 3. Classification and extraction layer

Maps OCR output into supported document classes and extracts structured fields such as agency, dates, locations, and required actions.

### Recommendation

Start with deterministic rules and document-class templates. Add a small bounded model later only if rules prove insufficient.

## 4. Explanation layer

Renders plain-language and translated explanation from reviewed templates tied to supported document classes and extracted fields.

## 5. Task engine

Turns user-confirmed dates and actions into tasks and local reminders.

## 6. Referral engine

Matches a user's selected city, state, or downloaded local region pack to verified referral records stored in a signed local bundle.

## Data model

## Core entities

- Document
- DocumentImage
- ExtractedField
- ExplanationSnapshot
- Task
- Reminder
- ReferralRecord
- ContentBundleMeta
- SafetyEvent

## Design rules for the data model

- keep user documents separate from product content bundles
- distinguish raw OCR text from extracted structured fields
- distinguish extracted fields from user-confirmed fields
- allow every generated output to be traced back to a document class and versioned content bundle

## Offline content strategy

Use signed content bundles for:

- document class rules
- explanation templates
- language packs
- referral directories
- fraud warnings and safety copy

The app should be able to keep working on the last valid downloaded bundle if connectivity disappears.

## Security model

- encrypt structured local data at rest
- encrypt or otherwise protect stored document files
- keep encryption keys in secure platform storage
- avoid third-party analytics SDKs in early builds

## Sync model

There should be no required account in v1.

### v1

- no cloud sync required
- no cloud handoff or export dependency

### later option

- encrypted opt-in backup or partner handoff flow after safety and trust validation

## Recommended implementation order

1. camera capture and local vault
2. OCR on supported document samples
3. deterministic classification and field extraction
4. explanation renderer and translation layer
5. task and reminder engine
6. referral bundle support
7. low-end device performance and recovery hardening

## What not to build first

- a general chatbot shell
- cloud-first account system
- full partner dashboard
- automated eligibility scoring
- centralized case database

## Open technical decisions

- which on-device OCR engine performs best on target documents and devices
- whether the first translation layer is fully offline or mixed offline plus bundled reviewed text
- whether document images should stay in-app only or also support encrypted external backup later
- whether iOS support begins in alpha or after Android pilot

## Architecture success test

The architecture is good enough if a person can install the app on a low-end Android device, scan a supported document, understand it, save it, create a reminder, and review trusted next-step help without needing to log in or stay connected to the internet.