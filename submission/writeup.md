# Claro: AI-Powered Immigration Document Scanner for Vulnerable Communities

**Subtitle:** Using Gemma 4 via Ollama to transform confusing legal documents into plain-language guidance — in English, Spanish, and Haitian Creole — entirely on-device and offline-capable.

---

## The Problem

Every year, millions of immigrants in the United States receive critical legal documents they cannot understand. A Notice to Appear. A hearing date from immigration court. An employment authorization denial. These documents are written in dense legal English, full of statutory references and bureaucratic jargon, and the consequences of misunderstanding them are devastating: missed court dates lead to in-absentia deportation orders. Missed filing deadlines mean lost asylum claims. And fraudulent "notarios" exploit the confusion, charging thousands of dollars for fake legal services.

The people most affected — undocumented immigrants, asylum seekers, refugees — are often the least equipped to navigate this system. Many speak limited English. Many cannot afford an attorney. Many are afraid to ask for help because doing so means revealing their immigration status. And in the current political climate, that fear is not irrational.

They need a tool that works without an internet connection, collects zero personal data, requires no account, and explains their documents in their own language. That tool is Claro.

## What Claro Does

Claro is a free, open-source mobile application that transforms immigration documents into actionable guidance. The user takes a photo of their document. Claro reads it, classifies it, extracts critical information (hearing dates, court locations, filing deadlines, A-numbers), and presents a plain-language explanation of what the document says, why it matters, and what to do next — in English, Spanish, or Haitian Creole.

Beyond classification, Claro detects scam indicators. If a document contains hallmarks of notario fraud — promises of guaranteed outcomes, demands for wire transfers, unofficial phone numbers, threats of immediate arrest — Claro warns the user in their language. The app also provides verified legal referrals: pro bono immigration attorneys, legal aid hotlines, and advocacy organizations across South Florida, Texas, Arizona, and nationwide.

Everything runs on the user's phone. No accounts. No cloud uploads. No data collection. Privacy is not a feature — it is the architecture.

## How Gemma 4 Powers Claro

Gemma 4 is the intelligence engine behind Claro's document analysis. We use the `gemma4:e2b` model (5.1 billion parameters, Q4_K_M quantization) running locally via Ollama. This architectural choice was deliberate: the communities we serve cannot depend on cloud APIs that require API keys, internet connectivity, and trust in third-party data handling. Gemma 4's open weights and Ollama's local inference model gave us frontier-level intelligence without compromising on privacy.

### Architecture

Claro's architecture consists of three layers:

**1. Mobile Client (Expo SDK 54 / React Native / TypeScript)**
The mobile app handles image capture and on-device OCR via Google ML Kit's `@react-native-ml-kit/text-recognition`. ML Kit's Latin-script model is bundled directly into the APK, so OCR works completely offline with zero network dependency. The extracted text is then sent to the analysis layer.

**2. Analysis Server (Express.js / Ollama)**
The server receives OCR text and forwards it to a locally running Ollama instance hosting `gemma4:e2b`. The Gemma 4 model receives a carefully engineered system prompt instructing it to perform seven-point analysis:

- **Document classification** across eight immigration document types (NTA, hearing notices, EAD cards, asylum receipts, bond notices, removal orders, RFE notices, fee waivers)
- **Agency identification** (EOIR, DHS, USCIS, ICE, CBP)
- **Confidence scoring** (0.0–1.0)
- **Urgency assessment** (high for court dates and removal orders, normal otherwise)
- **Structured field extraction** (dates, locations, agencies, required actions)
- **Trilingual explanations** (title, summary, why it matters, next step, help hint — in EN, ES, and HT)
- **Scam detection** (fake letterheads, wire transfer requests, threats, unofficial contacts)

The model responds in structured JSON with `format: 'json'` enforced by Ollama, using `temperature: 0.1` and `top_p: 0.8` for deterministic legal analysis. We constrain inference to `num_ctx: 2048` and `num_predict: 2048` to keep memory usage under 7.3 GiB, enabling the model to run on consumer hardware.

**3. Graceful Fallback (Local Regex Classifiers)**
If Ollama is unavailable — the user is offline, the server is down, or the device lacks resources — Claro falls back to a deterministic regex-based classification engine. This engine uses keyword pattern matching with configurable minimum-match thresholds to classify documents and extract fields locally. The fallback ensures Claro never fails silently; users always get a result.

### The Gemma 4 Advantage

Before Gemma 4, Claro relied entirely on regex classifiers. These worked for clear, well-scanned documents but broke down on:

- **Poor OCR quality** — misspelled words, merged lines, fragmented text from phone cameras
- **Non-standard formatting** — documents from different courts use different templates
- **Multilingual source documents** — some immigration documents include Spanish text
- **Nuanced classification** — distinguishing a bond hearing notice from a removal hearing notice requires contextual understanding, not just keyword matching

Gemma 4 solved all of these. In our end-to-end testing, Gemma 4 correctly classified a Notice of Hearing with 98% confidence from noisy OCR text, identified the issuing agency (EOIR), extracted five structured fields (hearing date, time, location, A-number, judge name), generated accurate trilingual explanations, and correctly reported no scam indicators — all in a single inference call returning structured JSON.

The model's instruction-following capability was critical. Immigration law demands precision: a misidentified document type or an incorrect urgency level could cause real harm. Gemma 4's consistent adherence to our JSON schema, even with imperfect input text, gave us the reliability required for a safety-critical application.

## Challenges and Technical Decisions

**Memory constraints on consumer hardware.** The `gemma4:e2b` model requires approximately 7.3 GiB of RAM at inference time. On our development machine (13.8 GB total), this meant careful memory management — killing stale Ollama model caches, managing Windows Memory Compression, and tuning context window size. We chose `num_ctx: 2048` as the optimal tradeoff between comprehension and resource usage, since immigration documents rarely exceed 1,500 tokens of OCR text.

**Structured JSON output.** Legal analysis requires machine-parseable output. We leveraged Ollama's `format: 'json'` parameter combined with a detailed schema in the system prompt. This eliminated the need for fragile output parsing and ensured the mobile client receives consistent, typed data.

**Trilingual generation.** Generating explanations in three languages within a single inference call (rather than three separate calls) was essential for latency. Gemma 4 handled this reliably, producing culturally appropriate explanations — not just mechanical translations. The Haitian Creole output was particularly important, as this language is underserved by most NLP tools.

**Privacy-first architecture.** We deliberately chose Ollama over cloud-hosted LLM APIs. For communities facing immigration enforcement, the difference between "your document text is processed locally" and "your document text is sent to a server" is not academic — it is a matter of safety. Gemma 4's open weights made this possible.

## Impact and Vision

Claro addresses the **Digital Equity & Inclusivity** challenge directly. Immigration legal documents are a barrier that disproportionately affects non-English speakers, low-income individuals, and communities with limited access to legal representation. By combining Gemma 4's language understanding with a privacy-first mobile app, Claro breaks down that barrier.

The vision extends beyond the current eight document types. Gemma 4's general-purpose understanding means adding new document types requires only updating the system prompt — no retraining, no new regex patterns, no code changes. As immigration law evolves and new document formats appear, Claro can adapt immediately.

We see Claro deployed in legal aid clinics, community organizations, churches, and immigration advocacy groups. A paralegal can scan a stack of documents in minutes. A community health worker can help a family understand their court date. A detained person's family member can photograph documents received in the mail and finally understand what they say.

The technology is ready. The need is urgent. And Gemma 4 made it possible.

## Links

- **Live Demo:** [https://claro-web-production.up.railway.app](https://claro-web-production.up.railway.app)
- **APK Download:** [https://expo.dev/artifacts/eas/hY2EyTTDNSb2YXdpDEREy5.apk](https://expo.dev/artifacts/eas/hY2EyTTDNSb2YXdpDEREy5.apk)
- **GitHub Repository:** [https://github.com/bscdevgroup28-sketch/Claro](https://github.com/bscdevgroup28-sketch/Claro)
