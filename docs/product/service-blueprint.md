# Service Blueprint

## Purpose

This blueprint maps how the solo-user experience connects to partner workflows, content operations, and safety controls. The app is only useful if the digital workflow ends cleanly in the real world.

## Actors

- user
- app
- referral and content system
- legal or service partner

## Workflow 1: document understanding

### Trigger

User receives a document and does not understand it.

### Frontstage user actions

- open app
- scan document
- review explanation
- confirm important details

### App actions

- capture image locally
- run OCR and extraction
- classify document or abstain
- show explanation and confidence-aware details

### Backstage dependencies

- document rules bundle
- language bundle
- safety policy bundle

### End states

- understood and saved
- abstained and referred

## Workflow 2: task creation and follow-through

### Trigger

The app or user identifies a required action or date.

### Frontstage user actions

- confirm date or action
- create reminder
- later reopen from notification
- mark done, edit, or seek help

### App actions

- create local task
- schedule local reminder
- link task back to document

### Backstage dependencies

- local notifications
- task state storage

### End states

- task created
- task completed
- task escalated to help flow

## Workflow 3: trusted referral

### Trigger

The app detects a high-risk scenario or the user asks for help directly.

### Frontstage user actions

- open help hub
- review referral list
- save or contact a provider

### App actions

- use a downloaded region pack or user-selected locality
- show source and freshness
- present contact actions

### Backstage dependencies

- maintained referral bundle
- source provenance and update timestamps

### Partner handoff outcome

The user reaches a verified provider with the original document, the confirmed due date or next action, and clear referral details.

## Workflow 4: reopen and continue

### Trigger

The user reopens a saved document or returns from a reminder notification.

### Frontstage user actions

- open saved document or task
- review explanation again
- update, complete, or revisit help

### App actions

- restore local document, task, and referral context
- preserve the path back to help when the case remains risky or unclear

### End state

The user returns to a clear next step instead of starting over.

## Workflow 5: privacy exit

### Trigger

User wants to remove some or all stored information.

### Frontstage user actions

- open settings or document actions
- choose delete item or full wipe
- confirm deletion

### App actions

- remove local files and structured records
- confirm deletion outcome clearly

### End state

User exits knowing the information is gone from the device.

## Operational responsibilities

## Product and legal review

- approve supported document classes
- approve explanation copy and abstain copy
- approve escalation triggers

## Content operations

- maintain signed bundles for referrals, explanations, and fraud warnings
- track publish date and expiry date
- retire unsafe or stale bundles quickly

## Partner operations

- validate referral accuracy
- provide feedback on explanation clarity and referral usefulness
- report frequent confusion patterns and unsupported documents

## Service failure points to test

- referral listing is stale
- low-confidence document is presented too strongly
- reminder fires for a wrong extracted date
- low-end device processing is too slow or memory-heavy to complete the flow
- user reaches a help dead end because the listing has gone stale

## Blueprint rule

Every digital workflow must end in a useful human or local outcome. If the product only tells the user something and does not help them act, the workflow is incomplete.