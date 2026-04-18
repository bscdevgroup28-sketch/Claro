# ICE Assist Discovery Plan

## Objective

Close the highest-risk knowledge gaps before engineering effort turns into rework or unsafe behavior.

## What we already know

- The product should be a navigator, document explainer, deadline tracker, and trusted referral tool.
- Local-first and low-bandwidth design are mandatory.
- Human escalation must be embedded in the product.
- Broad open-ended legal advice is outside scope.

## What still needs to be validated

### 1. Document reality

- What documents do users actually show up with most often?
- Which fields on each document matter most for action and urgency?
- Which documents look similar enough to cause classification mistakes?

### 2. User reality

- What phones do users actually carry?
- How often are phones shared, lost, reset, or out of battery?
- What literacy and language combinations matter most in pilot settings?
- What makes users trust or distrust an app touching immigration paperwork?

### 3. Partner workflow reality

- What information do shelter staff and legal screeners need users to bring?
- Which explanation and referral states help intake and which ones create liability?
- Which referrals do partners actually trust enough to be shown in-product?

### 4. Safety reality

- Which documents or scenarios must always trigger human escalation?
- What types of mistaken explanation would be most harmful?
- Which data flows would cause users or partners to reject the product?

### 5. Technical reality

- Which OCR approach works acceptably on low-end Android devices?
- What extraction quality is achievable on real document photos from the field?
- How large can offline content bundles become before updates become painful?

## Workstreams

## Workstream A: Document corpus

### Goal

Build the first real-world corpus of documents to support classification, extraction, and explanation design.

### Tasks

- Collect representative documents from legal aid and shelter partners.
- Group them by class, agency, urgency, and action type.
- Identify the minimum useful fields for each class.
- Flag ambiguous lookalikes and edge cases.

### Deliverables

- Tier 1 document list
- extraction schema per class
- document confusion map

## Workstream B: End-user interviews

### Goal

Understand how people actually receive, interpret, store, and act on immigration documents.

### Participant target

- 8 to 12 end users for early qualitative interviews
- 2 to 4 observed partner-assisted sessions only to understand edge conditions, not to define the default flow

### Questions to answer

- Where do documents get lost or misunderstood?
- Which terms or instructions cause the most confusion?
- Would users rather hear audio, read text, or use both?
- What information are they afraid to store on the phone?

## Workstream C: Partner interviews

### Goal

Define the real referral and escalation handoff the product should support.

### Participant target

- 6 to 10 legal aid or accredited representative interviews
- 6 to 10 shelter or navigation staff interviews

### Questions to answer

- What do you wish clients already understood before intake?
- Which documents are most time-consuming to explain repeatedly?
- What are the most dangerous misunderstandings?
- Which referral sources are reliable enough to display?

## Workstream D: Safety and legal review

### Goal

Translate risk into product controls before interface design solidifies.

### Tasks

- review escalation triggers with subject-matter experts
- review user-facing disclaimers and boundary language
- define abstain behavior for low-confidence cases
- define freshness policy for time-sensitive content

## Workstream E: Device and offline constraints

### Goal

Make sure the technical design matches the devices and conditions likely in pilot.

### Tasks

- confirm Android version and storage assumptions
- test OCR on low-end and mid-range devices
- measure battery and storage impact of the local vault
- test referral and translation bundle update size

## Research methods

- semi-structured interviews
- artifact review of real documents
- contextual observation of intake or navigation workflows when partners allow it
- paper or low-fidelity prototype walkthroughs
- small technical feasibility tests on target devices

## Decision gates

## Gate 1: Tier 1 document lock

Proceed to alpha only when supported document classes are validated by partner corpus and mapped to extraction requirements.

## Gate 2: language lock

Proceed to full explanation and translation implementation only when launch languages and review process are chosen.

## Gate 3: safety lock

Proceed to pilot only when abstain behavior, escalation rules, and disclaimer language are approved.

## Gate 4: tech lock

Proceed to app scaffolding only when OCR, local storage, and reminder behavior are validated on likely target devices.

## Suggested 3-week sequence

### Week 1

- collect document samples
- interview first partner group
- choose candidate Android devices for testing

### Week 2

- interview end users and observe limited partner-assisted edge cases
- draft extraction schemas
- test OCR on real sample images

### Week 3

- refine Tier 1 scope
- finalize safety gates
- lock the first product flow and engineering backlog

## Evidence gaps most likely to block build

- no verified Tier 1 document set
- no trusted referral data pipeline
- no agreed referral and escalation model for partner handoff
- no validated launch language set
- no tested OCR path for low-end Android devices