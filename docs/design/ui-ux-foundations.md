# UI and UX Foundations

## Design intent

The app should feel calm, serious, and humane for a user who may not speak or read English and may be using the phone alone. It should not look like consumer finance, generic wellness software, or a government enforcement tool.

## Experience principles

### 1. Reduce fear, do not amplify it

Use direct language, not alarmist language. Reserve urgent color and warning patterns for truly urgent states.

### 2. One decision per screen

Under stress, branching choices should stay limited. Each screen should make the next action obvious.

### 3. Text must be plain, audio-ready, and translation-friendly

Short sentences. Concrete verbs. No legal jargon unless immediately explained.

### 4. Trust must be visible

Users should see what is local, what is verified, what is uncertain, and when information was last updated.

### 5. Accessibility is core product behavior

Readable type, strong contrast, clear touch targets, voice support for key screens, and simple language are not polish items.

### 6. Solo-first use is the default

The default assumption is that no helper is present. The user must be able to move through the core flow without another person interpreting the interface.

## Visual direction

### Tone

Warm, steady, and authoritative without looking institutional.

### Color system

- Base background: warm sand or soft parchment
- Primary text: deep ink or slate
- Primary action: muted teal or deep blue-green
- Success: restrained green
- Warning: clay or amber
- Danger: rust red, only for real risk

Avoid glossy gradients, neon accents, and purple-heavy startup palettes.

## Typography

### Recommendation

- Primary Latin type: IBM Plex Sans
- Multilingual support and fallback: Noto Sans family

Why:

- IBM Plex Sans feels precise and human rather than generic
- Noto supports broad language coverage and is practical for multilingual UI

## Spacing and layout

- large touch targets
- strong vertical rhythm
- clear card structure for tasks, documents, and referrals
- avoid dense dashboards or two-column mobile layouts in core flows
- avoid long scrolling forms or steps that depend on precise text entry

## Component priorities

The first version needs a small, deliberate system.

### Core components

- primary action button
- secondary text button
- alert banner
- confidence badge
- freshness label
- task card
- document card
- referral card
- confirmation sheet
- audio playback control
- full-wipe confirmation dialog
- language selector

## State design

Every critical screen must have explicit designs for:

- loading
- success
- low confidence
- unsupported
- empty state
- stale content warning
- offline state

## Copy rules

- say what the app knows
- say what the app does not know
- say what the user should do next
- never imply legal advice or guaranteed outcome
- avoid passive voice when directing action

## Accessibility rules

- support dynamic text sizing
- maintain strong contrast ratios
- minimum touch target size of 44 by 44 points equivalent
- audio playback available for explanation and warning screens
- icon plus text, not icon alone
- never use color alone to convey urgency or confidence

## Solo-first interaction design

The app must work for a user who is alone, stressed, and may have limited literacy in the device's default language.

Implications:

- the first meaningful screen should be language selection
- key actions should be supported by icon plus text plus optional audio
- every critical screen should present one obvious next action
- the user should never need to type long freeform text to finish the main flow
- helper-compatible use is acceptable, but no critical action should depend on co-use

## Low-end Android constraints

- keep image handling memory-conscious and resilient to app interruption
- avoid heavy animation or transitions that delay action
- support older, smaller screens without hiding critical actions
- prefer simple layouts and predictable navigation over decorative effects
- make local processing states clear when they may take longer on constrained devices

## Motion and feedback

- use short, purposeful transitions
- processing screens should reassure the user that work is happening locally
- reminders and confirmations should feel stable, not playful
- motion should never be required to understand state changes

## Anti-patterns to avoid

- chat-first interface as the main shell
- overly bright gamified progress cues
- tiny legal disclaimers at the bottom of screens
- busy feeds with many competing cards
- mystery icons without labels

## Quality bar for design

If a stressed user with limited time, limited literacy, and no English support cannot tell what the next safest action is within a few seconds, the design is not good enough.