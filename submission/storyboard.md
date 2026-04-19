# Claro — Video Storyboard (≤3 minutes)

Target: Gemma 4 Good Hackathon | Judged primarily on video
Scoring: Impact & Vision (40pts) · Video Pitch & Storytelling (30pts) · Technical Depth (30pts)

---

## ACT 1: THE PROBLEM (0:00–0:35)

### Scene 1 — Cold Open (0:00–0:15)
**Visual:** Black screen. White text fades in, one line at a time:
```
"You have 30 days to respond."
"Se le ordena presentarse ante el tribunal."
"Ou dwe parèt nan dat sa a."
```
**Audio:** Tense, minimal ambient music. No narration yet.
**Text dissolves. Cut to:**

### Scene 2 — The Stakes (0:15–0:35)
**Visual:** B-roll montage (stock/AI-generated):
- Hands holding an official-looking legal document
- A worried family at a kitchen table
- An envelope from "Department of Homeland Security"
- A clock ticking (urgency metaphor)

**Narration (voiceover):**
> "Every year, millions of immigrants in the U.S. receive legal documents that will change their lives — court dates, deportation notices, asylum decisions. Most are written in dense legal English. Miss a deadline, and you could be deported. Misunderstand a notice, and you lose your chance at safety. And right now, predatory scammers — notarios — are charging thousands to 'help' with documents they can't even read."

**End on:** A document zoomed in showing dense legal text, blurred.

---

## ACT 2: THE SOLUTION — MEET CLARO (0:35–1:00)

### Scene 3 — Introducing Claro (0:35–0:50)
**Visual:** Claro splash screen animation → App home screen.
**Transition:** The blurred document from Scene 2 sharpens as it's shown on a phone screen inside the Claro app.

**Narration:**
> "This is Claro. A free, open-source app that scans immigration documents with your phone camera, reads them using on-device AI, and explains what they mean — in plain English, Spanish, or Haitian Creole."

### Scene 4 — Privacy Promise (0:50–1:00)
**Visual:** Quick cuts showing:
- "100% On-Device" badge on the app
- Phone with airplane mode icon (offline works)
- No login screen — straight to scanning

**Narration:**
> "No accounts. No cloud uploads. No data collection. Everything stays on your phone. For communities facing immigration enforcement, privacy isn't a feature — it's survival."

---

## ACT 3: LIVE DEMO (1:00–2:05)

### Scene 5 — Scanning a Document (1:00–1:20)
**Visual:** Screen recording of the full scan flow:
1. Home screen → tap "Scan Now"
2. Camera capture screen → select sample hearing notice (or use real camera)
3. Image Review screen showing the document photo
4. Tap "Analyze" → Processing screen with spinner

**Narration:**
> "Let's see it in action. A user photographs a Notice of Hearing from immigration court. Claro's on-device OCR reads the text instantly — no internet needed."

### Scene 6 — Gemma 4 Analysis Results (1:20–1:50)
**Visual:** Screen recording continues:
1. Results screen appears with "Powered by Gemma 4 · gemma4:e2b" blue badge
2. Show confidence score (98%)
3. Scroll through the plain-language explanation
4. Show extracted fields: hearing date, court location, judge name, A-number
5. Switch language to Spanish → show explanation updates
6. Switch to Haitian Creole → show explanation updates

**Narration:**
> "Behind the scenes, the OCR text is sent to Gemma 4 — Google's open-weight model running locally through Ollama. In seconds, Gemma classifies the document, extracts the critical details — hearing date, court location, presiding judge — and generates a clear explanation. Not a translation. An explanation. In the user's own language."
>
> "Watch — we switch to Spanish. And Haitian Creole. Each explanation is generated natively by Gemma 4 in a single inference call."

### Scene 7 — Scam Detection (1:50–2:05)
**Visual:** Screen recording:
1. Scan a document with scam indicators (or show the scam warning UI)
2. Red warning banner appears with trilingual scam alert
3. Show referral to verified legal help

**Narration:**
> "If a document contains scam indicators — fake letterhead, demands for wire transfers, threats of immediate arrest — Claro warns the user immediately and connects them to verified legal aid organizations."

---

## ACT 4: UNDER THE HOOD (2:05–2:30)

### Scene 8 — Architecture Diagram (2:05–2:20)
**Visual:** Clean animated diagram showing:
```
[Phone Camera] → [ML Kit OCR (on-device)] → [Gemma 4 via Ollama (local)]
                                                    ↓
                                          [Structured JSON]
                                                    ↓
                               [Classification · Fields · Trilingual Explanation · Scam Check]
```
Highlight: "No cloud. No API keys. Open weights."

**Narration:**
> "Claro's architecture is built for trust. ML Kit handles OCR on-device. The text goes to Gemma 4 running locally through Ollama — no API keys, no cloud calls. The model returns structured JSON: document type, urgency, extracted fields, explanations in three languages, and a scam analysis. If Ollama isn't available, local regex classifiers kick in as a safety net."

### Scene 9 — Real Terminal Output (2:20–2:30)
**Visual:** Quick flash of the real Gemma 4 JSON response from our end-to-end test:
- Show the actual terminal with the curl command and JSON output
- Highlight key fields: `"documentType": "Notice of Hearing"`, `"confidence": 0.98`, `"model": "gemma4:e2b"`

**Narration:**
> "This is real. 98% confidence. Structured, grounded, verifiable output from Gemma 4."

---

## ACT 5: VISION & CLOSE (2:30–2:55)

### Scene 10 — Impact (2:30–2:45)
**Visual:** Montage:
- Legal aid clinic with people using phones
- Community organization setting
- Map showing coverage: South Florida, Texas, Arizona, nationwide referrals

**Narration:**
> "Claro is already deployed — free on Android, with verified legal referrals across South Florida, Texas, Arizona, and nationwide. We see it in legal aid clinics, community centers, and churches — anywhere someone needs to understand a piece of paper that could change their life."

### Scene 11 — Closing (2:45–2:55)
**Visual:** Claro logo centered. Tagline appears below:
```
Claro
Understand your immigration documents — instantly.
Powered by Gemma 4
```
Links appear: GitHub · Live Demo · Download

**Narration:**
> "When the right tools are accessible to everyone, the possibilities for positive change are truly endless. This is Claro. Built with Gemma 4. Built for the people who need it most."

**Fade to black.**

---

## PRODUCTION NOTES

### Screen Recordings Needed
1. **Onboarding flow** — Language selection (EN/ES/HT) → Welcome screen → Region selection
2. **Home screen** — showing "Scan Now" card, tasks, recent docs
3. **Full scan flow (English)** — Camera → Image Review → Processing → Results with Gemma badge
4. **Language switching** — Results screen switching EN → ES → HT
5. **Scam warning** — Document with scam indicators triggering red banner
6. **Referral screen** — Legal help listings with phone numbers and regions
7. **Settings** — Privacy/safety screen showing "100% on-device" messaging

### Terminal Recording
8. **Gemma 4 inference** — `curl` to `/api/analyze` showing real JSON response

### Static Assets Needed
- Claro app icon / logo (for title card and close)
- Cover image for Kaggle Media Gallery
- Architecture diagram (clean, minimal)
- Screenshots for Media Gallery (5-8 key screens)

### B-Roll Options
- AI-generated or stock: hands holding documents, worried families, legal aid settings
- Clock/calendar imagery for deadline urgency
- Airplane mode icon for "offline" emphasis

### Music
- Tense/urgent for Act 1
- Hopeful/resolving for Acts 2-5
- Royalty-free (suggest: Epidemic Sound, Artlist, or YouTube Audio Library)

### Narration
- Clear, measured pace — ~150 words/minute
- Total script: ~400 words → fits comfortably in 2:55
- Record in quiet room, or use professional AI voice (ElevenLabs/Google TTS)
