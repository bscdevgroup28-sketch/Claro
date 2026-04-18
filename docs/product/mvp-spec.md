# ICE Assist MVP Spec

## Product goal

Help a person who may not speak or read English answer four urgent questions after receiving immigration paperwork:

1. What is this document?
2. What do I need to do next?
3. When do I need to do it?
4. Who can help me if this is serious or confusing?

## Primary users

### User 1: solo document holder

Needs help understanding a document, remembering deadlines, organizing papers, and getting to real assistance quickly.

The core v1 assumption is that the user is alone when the paperwork arrives. Helper-supported use can remain compatible, but it is not the product center of gravity.

## Jobs to be done

- When I receive a government paper I do not understand, help me figure out what it is.
- When the document is in English and I am not comfortable reading it, explain it in language I can understand.
- When there is a deadline or hearing, help me avoid missing it.
- When I need legal help, help me reach a trusted organization and arrive prepared.
- When I am under stress, keep the flow simple and low-risk.

## User journeys in scope

### Journey 1: understand a notice

The user photographs a document and receives a plain-language explanation, a translation, the relevant date, and a confidence-aware next step.

### Journey 2: create a task and reminder

The app identifies a hearing date, filing date, biometrics date, check-in, or missing item and turns it into a clear task with a reminder.

### Journey 3: reopen and manage a saved document

The user reopens a saved document, reviews the explanation again, checks the linked task, and decides whether to seek trusted help.

### Journey 4: find trusted help

The app shows verified referrals when the case is high risk, unclear, or outside supported flows.

## Functional requirements

## 1. Document capture and vault

- Capture document photos from camera.
- Save documents locally in a structured vault.
- Let users review, reopen, and delete saved items.
- Work without account creation.

### Acceptance criteria

- A user can scan and save a document while offline.
- A saved document remains accessible after app restart.
- A user can delete one document or all documents easily.

## 2. OCR and structured extraction

- Run OCR on supported documents.
- Extract agency, document type, document date, event date, deadline date, location, and next action when possible.
- Attach confidence to extracted fields.

### Acceptance criteria

- Supported documents produce structured fields rather than only raw OCR text.
- Low-confidence extraction clearly shows uncertainty and does not overstate facts.

## 3. Explanation and translation

- Explain the document in plain language.
- Offer supported languages.
- Use bounded explanations tied to supported document classes.

### Acceptance criteria

- The explanation never claims legal eligibility or strategy.
- Unsupported or ambiguous documents trigger an abstain and referral state.

## 4. Task generation and reminders

- Convert relevant dates and actions into tasks.
- Support reminder scheduling on-device.
- Let users confirm, edit, or dismiss a task.

### Acceptance criteria

- A user can create a reminder without being online.
- The app does not auto-create tasks from low-confidence dates without user review.

## 5. Trusted referral directory

- Show nearby or relevant legal aid, accredited representative, shelter, clinic, and hotline referrals.
- Mark the source and freshness of referral data.
- Support offline viewing of previously downloaded referral data.

### Acceptance criteria

- Every referral record includes source, last updated date, and contact method.
- Referral results can be shown from a downloaded region pack without collecting precise location.

## Supported document classes for v1

These are the first classes to validate with partners and build around.

- Notice to Appear and closely related court-entry notices
- hearing notices and other date-driven immigration court notices
- USCIS receipts and appointment notices tied to active case steps
- asylum filing receipts and biometrics-related notices
- change-of-address and address-update instructions
- DHS custody or release paperwork that creates immediate follow-up needs

The exact final list must be confirmed from a real partner corpus before alpha.

## Non-functional requirements

- Android-first mobile release
- offline-first behavior for the main flow
- usable on low-end Android devices
- low-bandwidth content updates
- local document storage by default
- multilingual UI and explanation layer
- audio support for key screens
- clear freshness indicators for risky content
- strong support for device sharing and phone loss scenarios

## Safety requirements

- No open-ended legal chat or legal advice mode in v1.
- No hidden background location collection.
- No mandatory sign-in for core flows.
- No auto-generated legal strategy.
- No silent failure on low-confidence extraction.
- No cloud case management dependency for the core flow.

## Non-goals

- pre-entry border strategy assistant
- asylum eligibility decision engine
- legal argument drafting
- centralized identity wallet
- generic immigration chatbot
- full case management system for organizations
- provider-ready intake summary workflow in v1

## Success metrics

- users correctly identify the next required action after scanning a supported document
- users confirm extracted dates at a high rate on the Tier 1 corpus
- users complete the notice-to-reminder flow without outside assistance at improving rates
- users connect to trusted referrals more often than baseline
- the core flow completes reliably on target low-end Android devices while offline

## Open product questions

- Which exact documents produce enough value to justify Tier 1 support?
- Which languages are required for a credible pilot?
- What minimum referral-pack geography and language coverage are required for a credible offline pilot?
- What is the smallest safe explanation set that still covers the highest-risk notices?