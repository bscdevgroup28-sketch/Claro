# ICE Assist Build Plan

## Mission

Build a downloadable, mobile-first, local-first app that helps immigrants understand official documents, track deadlines, organize case materials, and reach trusted human help without presenting itself as legal counsel.

## Product stance

- explain, organize, and route
- do not provide legal strategy
- local-first in v1, with no cloud dependency for the core loop
- human escalation is a core feature, not a fallback
- safety and trust outrank speed of feature expansion
- Android-first because that is the most realistic field deployment path
- solo-user first, with helper compatibility treated as secondary
- one complete offline flow outranks broad feature coverage
- v1 scope is bounded to scan, explain, confirm, task, vault, and referral

## Current build thesis

The first production wedge is a notice explainer plus deadline tracker plus trusted referral workflow for a person who may not read English and may have no one available to explain the paperwork. The app should help that person understand what paper they received, what action is required next, when it is due, and who can help if the case is risky or unclear.

## Build phases

## Phase 0: Discovery lock

### Goal

Validate the exact documents, user conditions, partner workflow, safety posture, and technical constraints before writing app code.

### Outputs

- MVP spec
- research plan
- safety framework
- local-first architecture
- first document corpus list
- first partner list

### Exit criteria

- top document classes for v1 are confirmed by at least 3 partner organizations
- the minimum launch language set is chosen
- escalation rules are approved by legal and service partners
- the team agrees on the mobile stack and local data model

## Phase 0.5: V1 experience design

### Goal

Turn the validated wedge into a fully defined first-version product with complete entry points, end states, navigation, UI rules, workflow wiring, and test coverage before app implementation expands.

### Outputs

- v1 experience blueprint
- navigation and screen map
- workflow and service blueprint
- UI and UX foundations
- end-to-end test plan

### Exit criteria

- every core workflow has a defined start state, decision points, failure states, and end state
- all critical screens have route ownership and navigation rules
- the team agrees on the first-version screen inventory
- the test plan covers happy paths, abstain paths, offline behavior, and privacy-critical flows

## Phase 1: Alpha build

### Goal

Ship the smallest working Android app that lets a solo user complete the full core loop on-device for a limited document set, including on low-end hardware.

### Scope

- camera capture and local document vault
- OCR and field extraction for Tier 1 documents
- plain-language explanation and translation
- detail confirmation before task creation
- task generation and reminders
- trusted referral directory
- deletion flow and local security controls

### Exit criteria

- a user can complete the full scan-to-explain-to-task-to-referral flow without creating an account or requiring a network connection for the main path
- extraction accuracy is high enough on the Tier 1 corpus to support assisted pilot use
- low-confidence documents clearly abstain and escalate
- the core flow remains usable on the target low-end Android device class

## Phase 2: Assisted pilot

### Goal

Test the app with partners in real environments where staff can observe confusion, mistrust, failure modes, and operational value.

### Scope

- partner onboarding
- signed content bundle updates
- field issue logging
- lightweight analytics that do not expose identity
- pilot metrics collection

### Exit criteria

- users consistently understand next steps better after scanning a document
- partner staff report reduced intake friction
- no critical safety failure is observed in pilot

## Phase 3: Production hardening

### Goal

Prepare for broader distribution with reliability, update mechanisms, accessibility polish, and security review.

### Scope

- encrypted local storage hardening
- content update signing and rollback
- improved referral coverage
- multilingual audio polish
- incident response and abuse handling
- app store packaging and distribution plan

## Workstreams

### Product

- lock Tier 1 user journeys
- define v1 and v1.1 boundary
- define screen contracts, navigation, and end-to-end flows
- create acceptance criteria for document flows

### Research

- collect real document corpus
- interview users, legal aid, shelters, and accredited reps
- validate trust and privacy assumptions

### Safety

- define abstain states
- define high-risk trigger rules
- review all user-facing disclaimers and escalation copy

### Engineering

- choose mobile stack
- implement local vault and reminders
- build OCR and extraction pipeline
- package rule and translation bundles for offline use

### Operations

- build the first trusted referral data pipeline
- define content freshness ownership
- define partner support and feedback loops

## Immediate next 14 days

1. Build the initial Tier 1 document list and collect sample documents from partners.
2. Run partner interviews with legal aid, accredited reps, and shelter staff.
3. Choose the Android-first stack and confirm OCR feasibility on low-end devices.
4. Draft the first structured extraction schema for notices, deadlines, and referrals.
5. Define the launch language set and translation review process.
6. Finalize the v1 experience blueprint, navigation map, and test plan before app scaffolding.

## Release blockers

- no verified document corpus
- no safe abstain behavior on low-confidence documents
- no validated referral source pipeline
- no simple deletion flow
- no freshness policy for high-risk content

## Success definition for the first build cycle

The first build cycle is successful if a real user who may not read English can photograph a supported document, understand the next action in plain language, confirm the important details, save the document locally, receive a reminder, and connect to trusted human help when the case is risky or confusing on a low-end Android device.