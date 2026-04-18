# ICE Assist Safety Framework

## Purpose

This product operates in a high-stakes environment where a bad explanation, a missed deadline, or an unsafe data flow can harm a real person. Safety is therefore part of the product architecture, not a later review layer.

## Core rule

The app may help a person understand, organize, and prepare. It may not present itself as a lawyer or as a source of final legal judgment.

## Harm model

## Harm 1: false confidence

The app gives a user the impression that a document is fully understood when extraction or explanation is uncertain.

### Controls

- confidence scoring on extracted fields
- visible uncertainty states
- abstain behavior on unsupported or ambiguous documents
- mandatory referral or escalation on high-risk classes

## Harm 2: mistaken legal guidance

The app says or implies what a user should argue, file, or claim legally.

### Controls

- no open-ended legal advice mode in v1
- bounded document explanations only
- no eligibility predictions
- explanation copy reviewed against product boundary language

## Harm 3: stale or misleading content

The app shows outdated information about process steps, locations, or trusted providers.

### Controls

- signed content bundles with publish date and expiry metadata
- freshness labels in the interface
- hard disable or warning state for expired high-risk content

## Harm 4: privacy exposure

The app stores or leaks personal information in a way that could expose the user to surveillance, coercion, or misuse.

### Controls

- local storage by default
- minimal data collection
- no hidden analytics or background location tracking
- encrypted local database and file vault
- easy document and accountless full-wipe flows

## Harm 5: shared-device misuse or coercion

Another person using the same device changes or views information without the user's real consent.

### Controls

- optional app lock and quick close behavior
- clear full-wipe and single-document delete flows
- notifications should avoid exposing sensitive document details on the lock screen by default
- clear distinction between extracted fields and user-confirmed fields

## Harm 6: missed deadlines due to automation error

The app creates the wrong task or wrong date from a document.

### Controls

- the user must confirm extracted critical dates before reminders are activated
- high-risk dates require clear review screen
- low-confidence dates cannot silently become reminders

## High-risk triggers that must escalate

- court hearing dates
- missed hearing risk
- detention or custody status issues
- removal or expedited removal paperwork
- appeal and motion deadlines
- unclear or conflicting paperwork
- suspected fraud or exploitation

## Safety posture for AI and automation

## v1 rule

Prefer structured extraction plus templated explanation over open-ended generation.

## Recommended pattern

1. classify document into a supported class
2. extract structured fields
3. attach confidence to each important field
4. render explanation from bounded templates and reviewed content
5. escalate when confidence or support level is not sufficient

## Not allowed in v1

- freeform chat that answers legal strategy questions
- hallucinated referrals or authorities
- hidden model behavior that cannot be audited at the feature level

## Data handling rules

- collect only what the feature needs
- store documents locally by default
- separate local content bundles from user documents
- log operational issues without collecting document images by default
- provide one-tap delete for local materials

## Release gates

Do not release alpha or pilot if any of the following are unresolved:

- unsupported documents are not clearly identified
- low-confidence extractions are not surfaced
- the product can imply legal advice
- referral source provenance is missing
- deletion flow is incomplete or hard to find
- content freshness cannot be verified

## Incident categories to monitor in pilot

- wrong document classification
- wrong date extraction
- misleading explanation
- stale referral data
- shared-device privacy confusion or unauthorized viewing
- user over-trust of the app

## Operating principle for the team

When safety conflicts with convenience, choose the safer product even if it slows feature expansion.