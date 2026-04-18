# ICE Assist V1 Experience Blueprint

## Purpose

This document expands the initial MVP wedge into a complete first-version product definition. The goal is not to make the product bigger for its own sake. The goal is to make it complete enough that a real solo user can enter from multiple starting points, move through clear decision paths, and end in a safe, useful state.

## V1 product promise

ICE Assist helps a person who may not speak or read English move from confusion to action after receiving immigration paperwork, even when no trusted helper is present.

The product must support four full outcomes:

1. understand a document
2. save and organize it safely
3. create the next task or reminder
4. connect to trusted human help when needed

## Difference between MVP and V1

### MVP wedge

Notice explainer plus deadline tracker plus trusted referral.

### V1 target

An end-to-end guided document support app with one complete offline flow on low-end Android for:

- first-run trust and language setup
- complete scan-to-understanding workflow
- local document vault and retrieval flow
- task center and reminder loop
- trusted help and escalation flow
- privacy, deletion, and safety controls
- offline and low-confidence behavior designed explicitly rather than left implicit

## V1 boundary

Included:

- scan
- explain
- confirm
- task
- vault
- referral

Not included:

- open-ended legal chat
- eligibility analysis
- provider-ready intake summary or export workflow
- cloud case management

## V1 pillars

### 1. Calm under pressure

Every screen should reduce cognitive load. The app should feel slower than panic and faster than bureaucracy.

### 2. Human dignity first

The app should not mimic enforcement systems or official hostility. It should feel respectful, legible, and non-coercive.

### 3. Safe certainty, visible uncertainty

When the app knows something, it should say it clearly. When it does not, it should say so plainly and route the user to help.

### 4. Offline value is the default

The core experience must still function when the network disappears.

### 5. Human handoff is a built-in finish line

The app is successful when it strengthens the user's next real-world interaction, not when it keeps them inside the app longer.

## Entry points

V1 must support these entry points intentionally.

| Entry point | User state | First screen | Success end state |
| --- | --- | --- | --- |
| Cold start, first install | confused or cautious new user who may not read English | Language selection | reaches home with language and trust context set |
| Scan now | user has paper in hand | Camera capture | document saved, explained, and next action clarified |
| Reminder notification | user returns because of a task | Task detail | task completed, edited, or escalated |
| Open saved document | user revisits a known document | Vault detail | explanation reviewed and follow-up action taken |
| Find help only | user already knows they need help | Help hub | referral saved, contacted, or noted for later |

## End states

Every core flow should terminate in one of these clear end states.

- understood and saved
- reminder created
- referred to trusted help
- safely abstained because confidence was too low
- deleted and exited

If a flow ends anywhere else, it is incomplete.

## V1 modules

## Module 1: Welcome and trust setup

Purpose: establish what the app does, what it does not do, and how data behaves.

Included:

- language selection
- short welcome statement in the chosen language
- short privacy and boundaries explanation
- optional quick tutorial

Not included:

- sign-up
- permissions wall before value is explained

## Module 2: Guided scan flow

Purpose: move from paper to usable understanding.

Included:

- camera capture
- image quality review
- local processing state
- supported versus unsupported result handling
- details review and user confirmation

## Module 3: Document vault

Purpose: let users come back to past documents without repeating work.

Included:

- saved documents list
- simple tags or categories
- document detail page
- delete and full wipe controls

## Module 4: Task center

Purpose: turn confusing paperwork into a manageable action list.

Included:

- upcoming tasks
- overdue tasks
- completed tasks
- reminder edit and dismiss
- link from task back to related document

## Module 5: Trusted help hub

Purpose: make escalation legible and actionable.

Included:

- legal aid and accredited representative listings
- shelters, clinics, and hotlines when relevant
- source and freshness labels
- save for later and contact actions

## Module 6: Safety and privacy center

Purpose: give the user control over data and expectations.

Included:

- what the app can and cannot do
- what stays on the device
- deletion flows
- low-confidence explanation policy
- current content freshness info

## Core workflow families

## Workflow A: First run

Start: app opened for the first time.

Finish: user lands on home with language selected and core trust message understood.

## Workflow B: Scan and understand

Start: user chooses scan.

Finish: user either understands and confirms the document or lands in a safe abstain state.

## Workflow C: Confirm next step

Start: app extracted dates or actions.

Finish: task is created, dismissed, or routed to human help.

## Workflow D: Find help

Start: app or user enters help flow.

Finish: referral contacted, saved, or intentionally deferred.

## Workflow E: Reopen and manage

Start: user opens a saved document or notification.

Finish: explanation refreshed, task updated, or document deleted.

## Workflow F: Privacy exit

Start: user wants to remove information.

Finish: selected content or all content is deleted and the user receives clear confirmation.

## V1 decision rules

- If the app is uncertain, route to abstain and help.
- If a date matters legally, the user must confirm it before reminder creation.
- If a case is hearing-related, detention-related, or conflicting, surface help early.
- The core flow must remain usable by a person with limited or no English without requiring another person to interpret the UI.

## V1 release definition

V1 is ready when the app supports all primary entry points, all core end states, and the complete scan-to-understand-to-task-to-help loop without requiring a network, account, or helper for the main flow on the target low-end Android device class.