# Southern Border Immigrant Support MVP Brief

## Core conclusion

The evidence does support building something real, but not an "AI immigration lawyer."

The strongest real-world product is a low-risk case navigation tool that helps people understand official paperwork, avoid missed deadlines, organize documents, and connect to trusted human help. The system should explain, translate, remind, and route. It should not decide legal strategy.

## What the literature says

### 1. Phones are essential, but access is fragile

Multiple refugee and migration studies describe the smartphone as a lifeline. People use phones for navigation, translation, contacting family, obtaining information, storing documents, sending money, and contacting aid. But the same literature is clear that phone access is unstable.

Common failure points include:

- no reliable charging access
- weak or expensive connectivity
- SIM registration barriers
- device loss, theft, confiscation, or sharing
- low digital literacy under stress
- language barriers and low literacy
- misinformation in group chats and social feeds

Product implication: any border-facing tool must be offline-first, low-bandwidth, multilingual, and usable in short bursts on unreliable devices.

### 2. Digital tools can protect people, but they can also expose them

The migration-tech literature repeatedly warns that the same device migrants rely on for survival can also become a surveillance and control surface. Phones can expose contacts, location, identity, and evidence trails. The broader digital migration literature also emphasizes extortion, trafficking, profiling, and state monitoring risks.

The 2024 Lancet Regional Health Europe framework on digital solutions for migrant and refugee health is especially useful here. Its design questions are not abstract. They ask whether an app creates surveillance risk, what data is collected in the background, whether the user can easily delete the app or data, whether the app excludes people by gender, age, documentation status, or financial situation, and whether there are non-digital alternatives for people who cannot safely use the product.

Product implication: privacy is not a feature layer. It is part of the product definition.

### 3. Standalone digital interventions have mixed results

The evidence on digital interventions for migrants and refugees is promising but uneven. Smartphone-based tools can improve access, privacy, and reach. But systematic reviews also show low adherence, high dropout, variable effectiveness, and weak evidence when tools are not culturally adapted or not paired with human systems.

The most consistent pattern is this: a standalone app is usually weaker than a tool embedded in a broader care or support pathway.

Product implication: the product should be designed to strengthen lawyer, accredited representative, shelter, clinic, or caseworker interactions, not replace them.

### 4. Access to counsel is one of the clearest leverage points

Access-to-counsel evidence is among the strongest findings in this entire domain.

The American Immigration Council summary of the Eagly and Shafer national study reports:

- only 37 percent of people in removal cases had representation
- only 14 percent of detained people had representation
- represented detained people with custody hearings were 4 times more likely to be released from detention than unrepresented people
- detained people with counsel were nearly 11 times more likely to seek relief such as asylum

This does not mean software should try to act as counsel. It means software should reduce friction between the user and actual counsel.

Product implication: trusted referral, meeting preparation, document organization, and question capture are not side features. They are core features.

### 5. Border digitization can create exclusion, not just efficiency

The CBP One literature is a direct warning against simplistic "digital solutionism."

Austin Kocher's 2023 paper on CBP One shows that digitizing asylum access created new barriers tied to device quality, internet access, email access, language, family composition, and facial recognition. Early reports documented crashes, login failures, geolocation misreads, appointment scarcity, and lower usability for Black migrants and darker-skinned users. The paper's main argument is important: treating these failures as mere software glitches depoliticizes the fact that an already vulnerable population was forced to rely on an experimental system at a life-or-death chokepoint.

Product implication: do not build a product whose value depends on users being perfect "techno-users" under extreme stress.

## What this means for a real MVP

## Recommended user

Primary user:

An asylum seeker or recent entrant connected to the southern border who may not speak or read English, has official paperwork in hand, and has no trusted person immediately available to explain what the notice means.

Secondary scenario for later:

A shelter volunteer, caseworker, legal screener, or family member may use the same flow beside the user, but the first version should not depend on a helper being present.

This is a better starting point than a generic pre-entry asylum assistant. The pre-entry border environment is too policy-volatile and too entangled with gatekeeping systems to be a safe first wedge.

## Recommended problem statement

People miss deadlines, misunderstand notices, lose track of documents, fall for scams, and fail to connect to appropriate legal help because the U.S. immigration process is text-heavy, high-stakes, fast-changing, multilingual, and structurally confusing.

## Recommended v1

### Notice explainer + deadline tracker + trusted referral

Core workflow:

1. User takes a photo of an official notice, screening paper, or court document.
2. The system extracts the date, agency, next action, and urgency level.
3. The system explains the document in plain language and the user's chosen language.
4. The system creates a simple task list with reminders.
5. The system helps the user organize related documents locally on the phone.
6. The system offers nearby trusted referrals to DOJ-accredited representatives, legal aid, shelters, clinics, and hotlines.
7. The system routes the user to trusted human help with the original document, the confirmed next step, and clear referral details.

This is narrow enough to ship and important enough to matter.

The first build target should be one complete offline flow on a low-end Android device covering scan, explain, confirm, task, vault, and referral.

## What the product should do

- explain what a government document is and why it matters
- extract deadlines, locations, hearing dates, filing dates, and missing items
- translate and simplify without pretending to provide legal interpretation
- warn about common scam patterns such as notario fraud or fake case help
- help users store documents locally in one place
- route users to real help when risk, complexity, or uncertainty is high

## What the product should not do

- claim to tell users whether they qualify for asylum or another status
- write legal arguments without expert review
- encourage border crossing strategy or evasion behavior
- depend on continuous cloud access
- collect precise location unless strictly necessary for an immediate referral use case
- become a general chatbot for open-ended legal advice
- function as a mandatory identity wallet or centralized case database in v1
- generate provider-ready intake summaries as a core v1 flow

## Safety boundaries

### Product language

The system should repeatedly state that it is an information and organization tool, not a lawyer, and that deadlines and legal options should be checked with a qualified representative when possible.

### Escalation rules

Immediate human referral should trigger when the system detects any of the following:

- court hearing date or missed hearing risk
- detention or custody issues
- removal or expedited removal documents
- asylum interview or merits hearing prep
- appeal deadline or motion deadline
- unclear status caused by conflicting paperwork
- signs of fraud or exploitation

### Data rules

- collect the minimum possible data
- default to local storage
- make deletion obvious and easy
- avoid background analytics that could expose identity or behavior
- do not require continuous account creation for core use
- clearly disclose what is stored on device and what leaves the device

### UX rules

- plain-language first
- icon-supported flows for low literacy contexts
- short screens with one action at a time
- audio playback for key instructions
- multilingual by design, with careful human review of high-risk content
- strong freshness indicators when policy content may be outdated

## Why this wedge is stronger than a generic immigration assistant

It targets a concrete, recurring failure mode: people do not understand what paper they received, what happens next, or who to trust.

It also fits the strongest evidence:

- phones are widely used for documents and information
- users need translation and comprehension support
- users need help bridging into human systems
- privacy and reliability constraints make broad AI automation dangerous

Most importantly, it aligns with a credible theory of impact:

- fewer missed deadlines
- fewer preventable no-shows
- better organized document sets for lawyers and accredited reps
- faster connection to trusted help
- lower scam vulnerability

## Metrics that make sense for a pilot

- percent of users who correctly understand the next required action after scanning a notice
- percent of extracted deadlines that users confirm are accurate
- percent of users who contact a trusted referral after using the tool
- reduction in reported scam exposure or confusion about unofficial helpers
- number of users arriving to legal intake with complete core documents
- retention through a multi-step case logistics flow

Do not use grant-rate improvement as the first product metric. Too many external factors sit between product use and legal outcome.

## Suggested pilot partners

- shelter networks in border cities
- legal aid nonprofits serving asylum seekers and recent arrivals
- DOJ-accredited nonprofit providers
- humanitarian clinics
- community groups already helping with document interpretation and appointment logistics

The product should be tested in environments where staff can observe confusion, mistrust, and failure modes in real time.

## Immediate research backlog before build

- collect the top 25 documents users actually bring to shelters and legal intakes
- map the top 10 confusion points for each document
- interview DOJ-accredited reps, legal aid attorneys, and shelter navigators about the minimum confirmed details they wish users understood before calling or arriving
- test whether users prefer photo-plus-audio explanations over text-heavy summaries
- identify the minimum safe multilingual set for pilot regions
- define a document freshness policy for anything tied to federal process changes

## Bottom line

The evidence supports building a real product if the product is framed as infrastructure for comprehension, coordination, and trusted handoff.

The wrong product is an autonomous legal bot.

The right first product is a secure, multilingual, offline-capable notice explainer and case logistics assistant that makes human legal help more reachable and more effective.

## Selected sources

- Matlin et al., Digital solutions for migrant and refugee health: a framework for analysis and action, Lancet Regional Health Europe, 2024. https://pmc.ncbi.nlm.nih.gov/articles/PMC11732709/
- Kocher, Glitches in the Digitization of Asylum: How CBP One Turns Migrants' Smartphones into Mobile Borders, Societies, 2023. https://www.mdpi.com/2075-4698/13/6/149
- American Immigration Council, Access to Counsel in Immigration Court. https://www.americanimmigrationcouncil.org/research/access-counsel-immigration-court
- El-Haj-Mohamad et al., Smartphone-delivered mental health care interventions for refugees: a systematic review, Cambridge Prisms Global Mental Health, 2023. https://pmc.ncbi.nlm.nih.gov/articles/PMC9947632/
- Mancini et al., The opportunities and risks of mobile phones for refugees' experience: a scoping review, PLOS One, 2019. https://pmc.ncbi.nlm.nih.gov/articles/PMC6886855/

## Operational sources

- DOJ Recognition and Accreditation Program. https://www.justice.gov/eoir/recognition-and-accreditation-program
- EOIR Pro Bono Legal Service Providers. https://www.justice.gov/eoir/list-pro-bono-legal-service-providers
- USA.gov warning on immigration scams. https://www.usa.gov/immigration-scams