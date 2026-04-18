# End-to-End Test Plan

## Objective

Validate that the first version is fully wired for a solo user who may not speak English, across happy paths, edge cases, and safety-critical failure states on low-end Android.

## Test categories

## 1. Happy-path workflows

### Test 1: first run to home in a non-English language

- install app
- select language
- review trust and boundaries
- land on home

Expected result:

- user reaches home without account creation
- boundary language is shown clearly in the selected language
- key first-run content is understandable without English

### Test 2: scan supported document to task while offline

- capture supported Tier 1 document
- confirm extracted details
- create reminder
- save to vault

Expected result:

- document is saved locally
- explanation is shown
- reminder exists in task center
- the core path works without network connectivity

### Test 3: scan supported document to referral

- capture high-risk supported document
- confirm details
- enter help flow
- open referral detail

Expected result:

- help flow appears before the user gets stranded in a dead end
- referral source and freshness are visible

### Test 4: reopen saved document from vault

- open saved document
- review explanation again
- open linked task or help flow

Expected result:

- the saved document is understandable on return
- the user can continue to task or help without starting over

## 2. Safety and abstain workflows

### Test 5: unsupported document

- scan unsupported document

Expected result:

- app does not guess confidently
- app shows safe abstain state and help options

### Test 6: low-confidence critical date

- scan a document with ambiguous date extraction

Expected result:

- app does not silently create a reminder
- user must confirm or reject the extracted date

### Test 7: stale referral content

- load outdated or expired referral bundle

Expected result:

- app shows freshness warning or disables risky use appropriately

## 3. Offline and device-condition workflows

### Test 8: full core flow while offline

- disable network
- scan supported document
- save document
- create task
- open help list from cached bundle

Expected result:

- core value remains available without connectivity

### Test 9: app restart persistence

- save document and task
- force-close app
- reopen app

Expected result:

- document and task remain available locally

### Test 10: low-end device performance and interruption behavior

- run capture flow on constrained test device
- interrupt the app during processing or backgrounding

Expected result:

- app fails gracefully and preserves existing local data
- the core flow remains usable under realistic device constraints

## 4. Privacy workflows

### Test 11: delete one document

- save multiple documents
- delete one

Expected result:

- deleted document and related generated artifacts are removed locally

### Test 12: full wipe

- populate vault, tasks, and referral history state
- run full wipe

Expected result:

- all local user data is removed
- user receives clear confirmation

## 5. Navigation wiring tests

### Test 13: reminder notification deep link

- fire reminder notification
- open from notification

Expected result:

- app opens directly to related task detail, not generic home

### Test 14: vault to related task to help flow

- open saved document
- open linked task
- enter help flow

Expected result:

- context is preserved across route changes

## 6. Language and solo-use tests

### Test 15: no-English solo explanation flow

- choose a supported non-English language
- scan a supported document
- rely only on translated UI and audio support to continue

Expected result:

- labels and actions remain understandable without English
- audio and visual cues are sufficient to complete the main flow
- the user does not need outside interpretation to reach a safe end state

## Test environments

- one modern Android device
- one low-end Android device approximating likely field conditions
- offline mode
- degraded network mode
- stale bundle simulation

## Release gates from testing

Do not move forward if any of the following fail:

- unsupported documents appear supported
- low-confidence dates can become reminders without confirmation
- deletion flows are incomplete
- referral freshness is invisible
- deep links break context or strand the user
- offline core flow does not work on the target device class
- the core flow requires a helper to interpret the interface

## QA rule

The product is not considered wired end-to-end until a solo user can reach a safe, useful end state under both normal and degraded conditions without English support for the main flow.