# First User Flow

## Goal

Define the first end-to-end flow the app must support for a user who may not speak English and has no one around to explain the paperwork.

## Core flow

### Screen 1: Language choice

Purpose: let the user choose interface and explanation language quickly.

Primary action: pick language.

Design rule: searchable, icon-supported, and understandable without English. This screen comes first.

## Screen 2: Welcome and boundaries

Purpose: explain what the app does in one short statement in the user's selected language.

Primary action: continue.

Secondary action: open saved documents.

Key copy rule: say the app helps explain paperwork and track steps, not provide legal advice.

## Screen 3: Camera capture

Purpose: capture a clear image of the document.

Primary action: take photo.

Secondary action: import from gallery if available.

Design rule: show simple prompts for lighting, framing, and all-page visibility.

## Screen 4: Image review

Purpose: confirm the image is readable.

Primary action: use this photo.

Secondary action: retake.

Design rule: keep this binary and fast.

## Screen 5: Processing

Purpose: show that the app is reading the document locally.

Primary action: none.

Design rule: reinforce privacy and local-first behavior.

## Screen 6A: Supported document result

Purpose: show the document class and the first plain-language explanation.

Primary action: continue.

Content to show:

- what this document appears to be
- why it matters
- what action may be required
- whether human help is recommended now

## Screen 6B: Unsupported or uncertain result

Purpose: fail safely when the document is not supported or confidence is low.

Primary action: get help.

Secondary action: save document anyway.

Content to show:

- the app is not certain what this document is
- the user should not rely on this explanation alone
- referral options or next safe step

## Screen 7: Important details review

Purpose: show extracted dates, locations, and required actions and let the user confirm them.

Primary action: confirm details.

Secondary action: edit or mark unsure.

Design rule: critical dates should never become reminders without review.

## Screen 8: Task creation

Purpose: turn confirmed details into a simple task.

Primary action: create reminder.

Secondary action: skip for now.

Content to show:

- task title
- due date
- why it matters

## Screen 9: Referral prompt

Purpose: route the user to trusted help if the document class or situation is high risk.

Primary action: view trusted help.

Secondary action: not now.

Trigger examples:

- hearing-related notice
- detention or reporting paperwork
- unclear or conflicting document state

## Screen 10: Referral list

Purpose: show verified organizations, contact methods, and freshness.

Primary action: call, copy contact info, or save for later.

Design rule: show source and last updated date for each listing.

## Screen 11: Save to vault

Purpose: confirm that the document and related task are saved locally.

Primary action: done.

Secondary action: view saved document.

## Screen 12: Completion screen

Purpose: let the user review the explanation result, task status, and help options in one place.

Primary action: return home.

Secondary action: open tasks.

## Supporting flows

### Saved documents

Users can browse saved documents, re-open explanations, review tasks, and delete items.

### Full wipe

Users can delete all stored materials from the device from a clearly labeled settings area.

### Help and boundaries

Users can review what the app can and cannot do, plus privacy and data behavior.

## First design rule

If a screen assumes another person is present, or if it does not help the user understand a document, remember a task, or reach trusted help, it probably does not belong in the first version.