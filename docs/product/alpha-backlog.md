# Alpha Backlog

## Objective

Build the smallest Android-first alpha that proves the full value loop for supported Tier 1 documents:

capture -> explain -> confirm -> task -> vault -> refer

## Build order

## Epic 0: Project skeleton

### Outcome

The team can run the mobile app locally and ship internal test builds.

### Tasks

- initialize the mobile app shell
- set up TypeScript, linting, and formatting
- set up environment handling without requiring a user account
- create navigation structure for scan, vault, tasks, referrals, and settings

### Done when

- internal testers can install and open the app on Android devices

## Epic 1: Local document vault

### Outcome

Users can capture and store document photos safely on-device.

### Tasks

- camera capture flow
- crop and rotation flow
- local document storage
- document list and detail view
- single-document delete and full-wipe flow

### Done when

- a user can scan, save, reopen, and delete a document while offline

## Epic 2: OCR and extraction pipeline

### Outcome

The app can recognize supported documents and pull out the fields that matter.

### Tasks

- wire in on-device OCR
- define extraction schema for Tier 1 classes
- implement deterministic classification rules
- attach confidence scores to extracted fields
- build unsupported-document state

### Done when

- supported sample documents return structured fields and unsupported ones abstain cleanly

## Epic 3: Explanation renderer

### Outcome

Users receive plain-language explanations tied to supported document classes.

### Tasks

- build reviewed explanation templates per document class
- render explanations from extracted fields
- add translation layer for launch languages
- add low-confidence warning language

### Done when

- a user can understand a supported document without entering a chat flow

## Epic 4: Task and reminder engine

### Outcome

Critical dates become user-confirmed tasks with on-device reminders.

### Tasks

- review screen for extracted dates
- task creation flow
- reminder scheduling
- task list screen
- edit and dismiss task actions

### Done when

- a user can confirm a date and receive a local reminder without internet access

## Epic 5: Trusted referral bundle

### Outcome

Users can see vetted help options from offline or recently updated local data.

### Tasks

- define referral record schema
- import signed referral bundle
- create local region or city filter flow
- show source and freshness metadata on each listing

### Done when

- the app can show partner-approved referrals without requiring live search

## Epic 6: Low-end Android reliability

### Outcome

The core flow remains usable on constrained devices likely to appear in the field.

### Tasks

- optimize image memory handling
- harden app resume and interruption recovery
- measure processing time on target low-end devices
- keep offline bundle size within device-friendly limits

### Done when

- a user can complete the main offline flow on the target low-end Android device class without repeated crashes or abandonment-inducing lag

## Epic 7: Safety controls and instrumentation

### Outcome

The alpha does not silently fail or create unsafe certainty.

### Tasks

- unsupported-document and low-confidence states
- high-risk automatic escalation prompts
- freshness labels for content bundles
- privacy settings and explanation screens
- minimal non-identifying issue logging

### Done when

- the app fails loudly and safely instead of guessing quietly

## Cut line for the first alpha

If time is constrained, keep these and cut the rest:

- local vault
- OCR and extraction for a narrow Tier 1 set
- explanation renderer
- task and reminder engine
- basic referral bundle support

## Do not build in alpha

- account system
- cloud sync
- open-ended chatbot
- iOS parity
- partner dashboard
- complex analytics stack

## Alpha quality bar

The first alpha is ready for internal and partner-assisted testing when a real sample document can go through the full core loop with clear abstain behavior on anything unsupported or uncertain.