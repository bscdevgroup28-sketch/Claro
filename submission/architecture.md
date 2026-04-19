# Claro — Architecture Diagram

```mermaid
flowchart TB
    subgraph Mobile["📱 Mobile App (Expo SDK 54 / React Native)"]
        direction TB
        CAM["Camera / Gallery\nImage Capture"]
        OCR["ML Kit OCR\nText Recognition"]
        CLASS["Local Classifier\n8 Document Types"]
        EXTRACT["Field Extractor\nDate · Location · Agency"]
        SCAM["Scam Detector\nNotario · Wire · Urgency"]
        UI["Result Screen\nTrilingual Explanation\nEN · ES · HT"]
        TASK["Task Manager\nReminders · Deadlines"]
        VAULT["Secure Vault\nLocal-only Storage"]
        REFER["Referral Engine\nRegion-specific Legal Aid"]
    end

    subgraph Server["🖥️ Express Server (Node.js)"]
        API["/api/analyze\nPOST Endpoint"]
    end

    subgraph AI["🤖 Ollama (Local)"]
        GEMMA["Gemma 4 (e2b)\n5.1B params · Q4_K_M\nStructured JSON Output"]
    end

    CAM --> OCR
    OCR -->|"OCR text"| API
    API -->|"System prompt +\nOCR text"| GEMMA
    GEMMA -->|"JSON: type, agency,\nconfidence, urgency,\nscam warnings,\ntrilingual explanation"| API
    API -->|"Analysis result"| UI
    OCR -->|"Fallback"| CLASS
    CLASS --> EXTRACT
    EXTRACT --> SCAM
    SCAM --> UI
    UI --> TASK
    UI --> VAULT
    UI --> REFER

    style Mobile fill:#f5f0e1,stroke:#2d4a3e,stroke-width:2px
    style Server fill:#e8f4f8,stroke:#2d4a3e,stroke-width:2px
    style AI fill:#fff3cd,stroke:#2d4a3e,stroke-width:2px
    style GEMMA fill:#ffd700,stroke:#2d4a3e,stroke-width:2px,color:#000
```

## Data Flow Summary

1. **Image Input** → User captures/selects document image
2. **OCR** → ML Kit extracts text from image
3. **Gemma 4 Analysis** → OCR text sent to Ollama via Express API
4. **Structured Response** → Gemma returns document type, confidence, trilingual explanation, scam warnings
5. **Fallback Path** → If Gemma unavailable, local regex classifier + field extractor + scam detector
6. **User Actions** → Confirm fields → Create reminders → Get region-specific legal referrals
7. **Local Storage** → Documents and tasks stored on-device only (privacy-first)
