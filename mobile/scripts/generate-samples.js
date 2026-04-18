/**
 * Generate sample document images for Claro demo/walkthrough.
 *
 * Run: node scripts/generate-samples.js
 * Requires: sharp (already a dev dependency)
 *
 * Creates:
 *   assets/samples/hearing-notice.png
 *   assets/samples/uncertain-doc.png
 *   assets/samples/nta.png
 *   assets/samples/ead-card.png
 *   assets/samples/asylum-receipt.png
 *   assets/samples/bond-notice.png
 *   assets/samples/removal-order.png
 *   assets/samples/rfe-notice.png
 */
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const SAMPLES = path.join(__dirname, '..', 'assets', 'samples');
if (!fs.existsSync(SAMPLES)) fs.mkdirSync(SAMPLES, { recursive: true });

const W = 600;
const H = 800;

// Shared helpers
function headerBlock(title, subtitle) {
  return `
    <rect x="40" y="30" width="520" height="90" rx="4" fill="#1a3c5e"/>
    <text x="300" y="65" text-anchor="middle" font-family="serif" font-size="18" font-weight="bold" fill="#ffffff" letter-spacing="1">${title}</text>
    <text x="300" y="88" text-anchor="middle" font-family="serif" font-size="12" fill="#d0d8e0">${subtitle}</text>
  `;
}

function sealCircle(cx, cy, r) {
  return `
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#1a3c5e" stroke-width="2" opacity="0.3"/>
    <circle cx="${cx}" cy="${cy}" r="${r * 0.75}" fill="none" stroke="#1a3c5e" stroke-width="1" opacity="0.2"/>
    <text x="${cx}" y="${cy + 5}" text-anchor="middle" font-family="serif" font-size="10" fill="#1a3c5e" opacity="0.3">SEAL</text>
  `;
}

function textLine(y, text, opts = {}) {
  const { x = 60, size = 13, bold = false, color = '#1a1a1a', opacity = 1 } = opts;
  return `<text x="${x}" y="${y}" font-family="monospace" font-size="${size}" fill="${color}" opacity="${opacity}" ${bold ? 'font-weight="bold"' : ''}>${text}</text>`;
}

function redactedLine(y, width = 200) {
  return `<rect x="60" y="${y - 10}" width="${width}" height="14" rx="2" fill="#1a1a1a" opacity="0.12"/>`;
}

function fieldRow(y, label, value) {
  return `
    ${textLine(y, label, { size: 11, color: '#666666' })}
    ${textLine(y + 18, value, { bold: true })}
  `;
}

// ── 1. Hearing Notice ──
function hearingNoticeSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="#faf8f4"/>
  <rect x="20" y="15" width="560" height="770" fill="white" stroke="#ccc" stroke-width="1" rx="2"/>
  ${headerBlock('UNITED STATES DEPARTMENT OF JUSTICE', 'Executive Office for Immigration Review')}
  ${sealCircle(110, 175, 35)}
  ${textLine(155, 'NOTICE OF HEARING', { x: 200, size: 16, bold: true })}
  ${textLine(175, 'IN REMOVAL PROCEEDINGS', { x: 200, size: 12, color: '#555' })}
  ${fieldRow(220, 'Case Number:', 'A### ### ###')}
  ${fieldRow(260, 'Respondent:', '████████████████')}
  ${fieldRow(300, 'You are required to appear for a hearing at:', '')}
  <rect x="60" y="320" width="480" height="100" rx="4" fill="#f0f4f8" stroke="#ccd" stroke-width="1"/>
  ${textLine(345, 'Harlingen Immigration Court', { x: 80, bold: true })}
  ${textLine(365, '2421 W. Bus. Hwy 77', { x: 80, size: 12 })}
  ${textLine(385, 'San Benito, TX 78586', { x: 80, size: 12 })}
  ${textLine(405, 'Date: May 2, 2026 at 8:30 AM', { x: 80, bold: true, color: '#c41e1e' })}
  ${textLine(450, 'You must appear at the date and time listed above.', { size: 12 })}
  ${textLine(470, 'Failure to appear may result in an order of removal', { size: 12 })}
  ${textLine(490, 'being entered in your absence.', { size: 12 })}
  ${redactedLine(530, 300)}
  ${redactedLine(555, 250)}
  ${textLine(600, 'Immigration Judge: ██████████████', { size: 12 })}
  ${textLine(630, 'Certificate of Service', { size: 11, color: '#666' })}
  ${redactedLine(650, 400)}
  ${redactedLine(675, 350)}
  <line x1="60" y1="720" x2="250" y2="720" stroke="#333" stroke-width="1"/>
  ${textLine(740, 'Signature of Immigration Judge', { size: 10, color: '#666' })}
</svg>`;
}

// ── 2. Uncertain / Blurry Document ──
function uncertainDocSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <filter id="blur"><feGaussianBlur stdDeviation="1.5"/></filter>
  </defs>
  <rect width="${W}" height="${H}" fill="#e8e4de"/>
  <rect x="30" y="25" width="540" height="750" fill="#fefefe" stroke="#bbb" stroke-width="1" rx="1" transform="rotate(1.5 300 400)"/>
  <g filter="url(#blur)" opacity="0.7">
    ${textLine(80, 'DEPARTMENT OF █████████', { size: 14, bold: true })}
    ${redactedLine(110, 350)}
    ${redactedLine(135, 280)}
    ${redactedLine(160, 320)}
    ${redactedLine(190, 150)}
    ${textLine(230, '████ ██ ████████', { size: 13 })}
    ${redactedLine(260, 400)}
    ${redactedLine(285, 360)}
    ${redactedLine(310, 300)}
    ${redactedLine(340, 250)}
    ${redactedLine(370, 380)}
    ${redactedLine(400, 200)}
  </g>
  <rect x="50" y="450" width="500" height="2" fill="#999" opacity="0.3"/>
  <g filter="url(#blur)" opacity="0.5">
    ${redactedLine(480, 420)}
    ${redactedLine(510, 350)}
    ${redactedLine(540, 300)}
    ${redactedLine(570, 380)}
  </g>
  <text x="300" y="680" text-anchor="middle" font-family="sans-serif" font-size="14" fill="#999" opacity="0.5">[partially obscured]</text>
</svg>`;
}

// ── 3. Notice to Appear (NTA) ──
function ntaSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="#faf8f4"/>
  <rect x="20" y="15" width="560" height="770" fill="white" stroke="#ccc" stroke-width="1" rx="2"/>
  ${headerBlock('UNITED STATES DEPARTMENT OF JUSTICE', 'Executive Office for Immigration Review')}
  ${sealCircle(110, 175, 35)}
  ${textLine(155, 'NOTICE TO APPEAR', { x: 200, size: 18, bold: true })}
  ${textLine(200, 'In the Matter of:', { size: 12, color: '#555' })}
  ${redactedLine(220, 250)}
  ${textLine(250, 'IN REMOVAL PROCEEDINGS UNDER', { size: 11, color: '#555' })}
  ${textLine(268, 'SECTION 240 OF THE IMMIGRATION AND', { size: 11, color: '#555' })}
  ${textLine(286, 'NATIONALITY ACT', { size: 11, color: '#555' })}
  ${fieldRow(320, 'File Number:', 'A### ### ###')}
  ${textLine(370, 'You are an arriving alien', { bold: true })}
  ${textLine(395, 'OR', { size: 11, color: '#666' })}
  ${textLine(415, '☑ You are an alien present in the United States', { size: 12 })}
  ${textLine(445, 'who arrived in the United States at or near:', { size: 12 })}
  ${redactedLine(465, 280)}
  ${textLine(500, 'on or about: ██████████', { size: 12 })}
  ${textLine(535, 'The factual allegations and charges in this', { size: 12 })}
  ${textLine(555, 'notice are set forth below:', { size: 12 })}
  ${redactedLine(580, 450)}
  ${redactedLine(605, 400)}
  ${redactedLine(630, 420)}
  ${redactedLine(655, 350)}
  <line x1="60" y1="720" x2="250" y2="720" stroke="#333" stroke-width="1"/>
  ${textLine(740, 'Signature of Issuing Officer', { size: 10, color: '#666' })}
</svg>`;
}

// ── 4. EAD Card ──
function eadCardSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="#e8e4de"/>
  <rect x="50" y="150" width="500" height="310" rx="12" fill="white" stroke="#1a3c5e" stroke-width="2"/>
  <rect x="50" y="150" width="500" height="50" rx="12" fill="#1a3c5e"/>
  <rect x="50" y="188" width="500" height="12" fill="#1a3c5e"/>
  <text x="300" y="182" text-anchor="middle" font-family="serif" font-size="14" fill="white" font-weight="bold">UNITED STATES OF AMERICA</text>
  <text x="300" y="222" text-anchor="middle" font-family="serif" font-size="16" fill="#1a3c5e" font-weight="bold">EMPLOYMENT AUTHORIZATION CARD</text>
  <rect x="80" y="250" width="100" height="120" rx="4" fill="#ddd" stroke="#bbb" stroke-width="1"/>
  <text x="130" y="315" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#999">PHOTO</text>
  ${textLine(270, 'Category: C09', { x: 210, size: 12, bold: true })}
  ${textLine(290, 'Card Expires: 12/15/2026', { x: 210, size: 12, bold: true })}
  ${textLine(315, 'Last Name: ████████████', { x: 210, size: 11 })}
  ${textLine(335, 'First Name: ███████', { x: 210, size: 11 })}
  ${textLine(360, 'A#: ### ### ###', { x: 210, size: 11 })}
  ${textLine(385, 'USCIS#: ███-███-███', { x: 210, size: 11 })}
  ${textLine(410, 'Country of Birth: ██████', { x: 210, size: 11 })}
  <rect x="380" y="380" width="140" height="60" rx="2" fill="#f0f0f0" stroke="#ccc" stroke-width="1"/>
  <text x="450" y="415" text-anchor="middle" font-family="monospace" font-size="8" fill="#999">FINGERPRINT</text>
  <text x="300" y="490" text-anchor="middle" font-family="monospace" font-size="9" fill="#666">NOT VALID FOR REENTRY TO THE UNITED STATES</text>
</svg>`;
}

// ── 5. Asylum Receipt (I-589) ──
function asylumReceiptSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="#faf8f4"/>
  <rect x="20" y="15" width="560" height="770" fill="white" stroke="#ccc" stroke-width="1" rx="2"/>
  ${headerBlock('U.S. CITIZENSHIP AND IMMIGRATION SERVICES', 'Department of Homeland Security')}
  ${sealCircle(500, 170, 30)}
  ${textLine(155, 'ASYLUM OFFICE RECEIPT', { x: 80, size: 16, bold: true })}
  ${textLine(175, 'Form I-589 Acknowledgment', { x: 80, size: 12, color: '#555' })}
  <rect x="60" y="195" width="480" height="2" fill="#1a3c5e" opacity="0.3"/>
  ${fieldRow(225, 'Receipt Date:', 'March 15, 2026')}
  ${fieldRow(265, 'Applicant:', '████████████████')}
  ${fieldRow(305, 'A-Number:', 'A### ### ###')}
  ${fieldRow(345, 'USCIS Receipt Number:', 'ZLA##########')}
  <rect x="60" y="385" width="480" height="130" rx="4" fill="#f0f8f0" stroke="#4a9" stroke-width="1"/>
  ${textLine(410, 'Your application for asylum has been received.', { x: 80, size: 12, bold: true })}
  ${textLine(435, 'You have been scheduled for a biometrics', { x: 80, size: 12 })}
  ${textLine(455, 'appointment. See attached notice for date,', { x: 80, size: 12 })}
  ${textLine(475, 'time, and location.', { x: 80, size: 12 })}
  ${textLine(500, 'While your case is pending, this receipt serves as', { x: 80, size: 11, color: '#555' })}
  ${textLine(540, 'You may apply for Employment Authorization (EAD)', { x: 60, size: 12 })}
  ${textLine(560, '180 days after your asylum application filing date.', { x: 60, size: 12 })}
  ${redactedLine(600, 400)}
  ${redactedLine(625, 300)}
  <line x1="60" y1="700" x2="250" y2="700" stroke="#333" stroke-width="1"/>
  ${textLine(720, 'USCIS Asylum Office', { size: 10, color: '#666' })}
</svg>`;
}

// ── 6. Bond Notice ──
function bondNoticeSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="#faf8f4"/>
  <rect x="20" y="15" width="560" height="770" fill="white" stroke="#ccc" stroke-width="1" rx="2"/>
  ${headerBlock('U.S. DEPARTMENT OF HOMELAND SECURITY', 'Immigration and Customs Enforcement')}
  ${sealCircle(500, 170, 30)}
  ${textLine(160, 'NOTICE OF CUSTODY', { x: 80, size: 16, bold: true })}
  ${textLine(180, 'DETERMINATION', { x: 80, size: 16, bold: true })}
  ${fieldRow(220, 'Subject:', '████████████████')}
  ${fieldRow(260, 'A-Number:', 'A### ### ###')}
  ${fieldRow(300, 'Facility:', '██████████ Processing Center')}
  <rect x="60" y="340" width="480" height="90" rx="4" fill="#fff8e8" stroke="#e8c840" stroke-width="1"/>
  ${textLine(365, 'Bond Amount: $8,000.00', { x: 80, size: 16, bold: true, color: '#8b6914' })}
  ${textLine(395, 'Bond Type: Delivery Bond', { x: 80, size: 13, color: '#8b6914' })}
  ${textLine(415, 'Status: SET — Bond hearing available', { x: 80, size: 13, color: '#8b6914' })}
  ${textLine(460, 'You have the right to request a bond', { size: 12 })}
  ${textLine(480, 'redetermination hearing before an', { size: 12 })}
  ${textLine(500, 'Immigration Judge.', { size: 12 })}
  ${textLine(540, 'Conditions of release:', { size: 12, bold: true })}
  ${textLine(560, '• Report to ICE as directed', { size: 12 })}
  ${textLine(580, '• Appear at all scheduled hearings', { size: 12 })}
  ${textLine(600, '• Notify ICE of any address change', { size: 12 })}
  ${redactedLine(640, 300)}
  <line x1="60" y1="700" x2="250" y2="700" stroke="#333" stroke-width="1"/>
  ${textLine(720, 'ICE Deportation Officer', { size: 10, color: '#666' })}
</svg>`;
}

// ── 7. Removal Order ──
function removalOrderSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="#faf8f4"/>
  <rect x="20" y="15" width="560" height="770" fill="white" stroke="#ccc" stroke-width="1" rx="2"/>
  ${headerBlock('UNITED STATES DEPARTMENT OF JUSTICE', 'Executive Office for Immigration Review')}
  ${sealCircle(110, 175, 35)}
  <rect x="180" y="140" width="350" height="40" rx="4" fill="#c41e1e" opacity="0.1"/>
  ${textLine(165, 'ORDER OF THE IMMIGRATION JUDGE', { x: 190, size: 15, bold: true, color: '#c41e1e' })}
  ${fieldRow(210, 'In the Matter of:', '████████████████')}
  ${fieldRow(250, 'File Number:', 'A### ### ###')}
  <rect x="60" y="290" width="480" height="2" fill="#c41e1e" opacity="0.3"/>
  ${textLine(320, 'IT IS HEREBY ORDERED that the respondent', { bold: true })}
  ${textLine(345, 'be REMOVED from the United States to', { bold: true })}
  ${textLine(370, '██████████████', { bold: true })}
  ${textLine(410, 'pursuant to the charges contained in the', { size: 12 })}
  ${textLine(430, 'Notice to Appear, under Section 240 of the', { size: 12 })}
  ${textLine(450, 'Immigration and Nationality Act.', { size: 12 })}
  <rect x="60" y="475" width="480" height="80" rx="4" fill="#fde8e8" stroke="#c41e1e" stroke-width="1"/>
  ${textLine(500, 'APPEAL RIGHTS: You may appeal this', { x: 80, size: 12, bold: true, color: '#c41e1e' })}
  ${textLine(520, 'decision to the Board of Immigration Appeals', { x: 80, size: 12, color: '#c41e1e' })}
  ${textLine(540, 'within 30 days of this order.', { x: 80, size: 12, color: '#c41e1e' })}
  ${textLine(580, 'Appeal deadline: ██████████████', { bold: true })}
  ${redactedLine(610, 400)}
  ${redactedLine(640, 350)}
  <line x1="60" y1="700" x2="250" y2="700" stroke="#333" stroke-width="1"/>
  ${textLine(720, 'Immigration Judge', { size: 10, color: '#666' })}
</svg>`;
}

// ── 8. Request for Evidence (RFE) ──
function rfeSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="#faf8f4"/>
  <rect x="20" y="15" width="560" height="770" fill="white" stroke="#ccc" stroke-width="1" rx="2"/>
  ${headerBlock('U.S. CITIZENSHIP AND IMMIGRATION SERVICES', 'Department of Homeland Security')}
  ${sealCircle(500, 170, 30)}
  ${textLine(160, 'REQUEST FOR EVIDENCE', { x: 80, size: 16, bold: true })}
  ${textLine(180, '(RFE)', { x: 80, size: 14, bold: true, color: '#555' })}
  ${fieldRow(215, 'Receipt Number:', 'IOE##########')}
  ${fieldRow(255, 'Applicant:', '████████████████')}
  ${fieldRow(295, 'Form Type:', 'I-485')}
  <rect x="60" y="330" width="480" height="100" rx="4" fill="#fff8e8" stroke="#e8a040" stroke-width="1"/>
  ${textLine(355, 'RESPONSE DEADLINE:', { x: 80, size: 13, bold: true, color: '#8b4514' })}
  ${textLine(380, 'You must respond within 87 days of the', { x: 80, size: 12, color: '#8b4514' })}
  ${textLine(400, 'date of this notice.', { x: 80, size: 12, color: '#8b4514' })}
  ${textLine(415, 'Due Date: ██████████████', { x: 80, size: 12, bold: true, color: '#c41e1e' })}
  ${textLine(455, 'The following evidence is needed:', { size: 12, bold: true })}
  ${textLine(480, '1. Proof of valid immigration status', { size: 12 })}
  ${textLine(500, '2. Medical examination (Form I-693)', { size: 12 })}
  ${textLine(520, '3. Evidence of financial support', { size: 12 })}
  ${textLine(540, '4. Certified copies of civil documents', { size: 12 })}
  ${textLine(575, 'Failure to respond within the deadline', { size: 11, color: '#c41e1e' })}
  ${textLine(595, 'may result in denial of your application.', { size: 11, color: '#c41e1e' })}
  ${redactedLine(630, 400)}
  <line x1="60" y1="700" x2="250" y2="700" stroke="#333" stroke-width="1"/>
  ${textLine(720, 'USCIS Officer', { size: 10, color: '#666' })}
</svg>`;
}

async function main() {
  const samples = [
    { name: 'hearing-notice', svg: hearingNoticeSvg },
    { name: 'uncertain-doc', svg: uncertainDocSvg },
    { name: 'nta', svg: ntaSvg },
    { name: 'ead-card', svg: eadCardSvg },
    { name: 'asylum-receipt', svg: asylumReceiptSvg },
    { name: 'bond-notice', svg: bondNoticeSvg },
    { name: 'removal-order', svg: removalOrderSvg },
    { name: 'rfe-notice', svg: rfeSvg },
  ];

  for (const { name, svg } of samples) {
    await sharp(Buffer.from(svg()))
      .resize(W, H)
      .png()
      .toFile(path.join(SAMPLES, `${name}.png`));
  }

  console.log(`Generated ${samples.length} sample images in assets/samples/`);
}

main().catch((err) => { console.error(err); process.exit(1); });
