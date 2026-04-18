# Tier 1 Document Hypothesis

## Purpose

This is the working list of document classes most likely to matter in the first build. It is not the final corpus. It is the hypothesis we will validate with legal aid, accredited representatives, and shelter partners.

## Selection logic

Tier 1 documents should satisfy most of these conditions:

- common in partner intake settings
- high confusion cost if misunderstood
- strong next-step value if explained correctly
- extractable enough to support structured fields
- risky enough to justify reminder and referral features

## Candidate Tier 1 classes

| Document class | Why it matters | Fields to extract first | Default product behavior | Escalate automatically |
| --- | --- | --- | --- | --- |
| Notice to Appear, including closely related court-entry notices | Signals entry into removal proceedings and often creates immediate fear and confusion | document type, issue date, hearing date if present, hearing location if present, case identifier if user chooses to store it | explain what the notice means, surface any date present, create task only after user confirmation | Yes |
| Hearing notice from immigration court | Missing a hearing can be catastrophic | hearing date, time, court, hearing format if stated | create urgent task, reminders, and preparation checklist | Yes |
| USCIS receipt notice tied to a live case step | Users often do not understand whether this is a receipt, approval, denial, or next-step notice | notice type, form type if stated, receipt date, receipt number if user chooses to store it | explain status in plain language and tell the user whether action is required now | No, unless conflicting or unclear |
| USCIS appointment or biometrics notice | These are date-driven and easy to miss | appointment date, time, location, required items if listed | create task and reminder, explain what to bring | Yes if missed or near deadline |
| Asylum filing confirmation or case-step notice | Important for people trying to understand whether an asylum filing is active and what comes next | case step, date, agency, next required action | explain what stage the person may be in and route to help for case-specific questions | Usually |
| Change-of-address instructions or related notices, including court and agency address-update flows | Address mistakes cause missed mail and missed deadlines | responsible agency, required form or channel, due action, mailing or filing destination if listed | explain why address updates matter and build a task | No, unless a deadline is imminent |
| DHS release, custody, or reporting paperwork such as I-220A or related release or check-in documents | Often creates urgent obligations and confusion about status and reporting | reporting date, reporting location, conditions, document date | explain obligations carefully and route to legal help | Yes |

## Likely v1.1 or later classes

- work authorization notices tied to Form I-765
- interview scheduling notices outside the initial Tier 1 corpus
- ICE alternatives-to-detention app or check-in instructions if partners confirm high frequency
- decision notices that require more complex legal explanation than v1 can safely provide

## Fields that deserve special caution

- case identifiers
- A-numbers
- receipt numbers
- home address
- phone numbers
- names of family members

These fields may be useful, but the product should not force their capture for the core explanation flow.

## Validation questions for partners

1. Which of these documents do you see most often?
2. Which of these documents cause the most harmful misunderstanding?
3. Which fields do you actually need captured before intake?
4. Which document classes are too risky for automated explanation in v1?
5. Which look similar enough that misclassification is a real danger?

## Engineering implication

The first extraction schema should be built per document class, not as one generic OCR parser. The product value depends on high-confidence fields and safe abstain behavior, not on broad unsupported coverage.