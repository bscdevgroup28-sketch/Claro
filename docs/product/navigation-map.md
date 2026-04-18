# Navigation Map

## Navigation model

Use a simple bottom-tab shell with a persistent scan action.

### Primary destinations

- Home
- Vault
- Tasks
- Help
- Settings

### Persistent action

- Scan document

## Why this model

- the app is used under stress, so destination count must stay low
- scan is the most important action and should always be reachable
- reminders, saved paperwork, and referrals deserve stable homes rather than buried menus

## Route structure

## Launch stack

- language-selection
- welcome-and-boundaries
- home

## Scan stack

- camera-capture
- image-review
- processing
- supported-result
- unsupported-result
- detail-confirmation
- task-create
- referral-gate
- completion-screen

## Vault stack

- vault-list
- document-detail
- extracted-details
- linked-tasks

## Task stack

- task-list
- task-detail
- task-edit
- task-complete

## Help stack

- help-hub
- referral-list
- referral-detail
- emergency-warning-and-scam-help

## Settings stack

- safety-and-privacy
- content-freshness
- language-settings
- full-wipe
- app-about-and-boundaries

## Home composition

Home should be a decision dashboard, not a feed.

### Home sections

- primary scan button
- urgent tasks card
- recent documents card
- get trusted help card
- fraud and scam warning card when relevant

## Route-to-route wiring

| From | To | Trigger |
| --- | --- | --- |
| language-selection | welcome-and-boundaries | language confirmed |
| welcome-and-boundaries | home | continue |
| home | camera-capture | scan action |
| camera-capture | image-review | photo captured |
| image-review | processing | use photo |
| processing | supported-result | supported class found |
| processing | unsupported-result | low confidence or unsupported |
| supported-result | detail-confirmation | continue |
| detail-confirmation | task-create | critical date or action confirmed |
| detail-confirmation | completion-screen | no task needed |
| task-create | referral-gate | task created and help should be offered |
| task-create | completion-screen | task created and no immediate help gate |
| referral-gate | referral-list | get help |
| referral-gate | completion-screen | skip for now |
| referral-list | referral-detail | listing selected |
| unsupported-result | referral-list | get help |
| completion-screen | vault-list | view saved docs |
| completion-screen | home | done |
| task-list | task-detail | task selected |
| task-detail | document-detail | related document selected |
| help-hub | referral-list | browse help |
| settings | full-wipe | delete everything |

## Global actions

These should be reachable from more than one place.

- change language
- view safety boundaries
- delete one document
- delete all documents
- call or copy referral contact info
- play audio explanation

## Deep link and return paths

### Reminder notification

Notification opens task-detail, not home.

### Reopen saved document

Document list opens document-detail with direct access to explanation, task, and help.

### Help-first path

Home and unsupported-result should both route into the help flow.

## Navigation rules

- never place the only delete control behind an obscure menu
- never trap the user inside a wizard without a safe exit
- always provide a visible path back to home, related document, and trusted help
- preserve task and document context when moving between task, vault, and help flows

## Screen inventory target

The first version should aim for a compact screen inventory with clear ownership rather than many lightly differentiated pages. If two screens do not have distinct decisions or states, combine them.