import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const lines = [
  { text: "TAYYABA AHMED", size: 22, gap: 16 },
  { text: "Software Developer", size: 12, gap: 18 },
  {
    text: "tayyabaahmed777@gmail.com  ·  Available worldwide",
    size: 10,
    gap: 10,
  },
  { text: "github.com/tayyaba-ahmed  ·  linkedin.com/in/tayyabaahmed", size: 10, gap: 28 },
  { text: "ABOUT", size: 11, gap: 14 },
  {
    text: "I take ownership from brief to production. Clean architecture, accessible UI, and decisions that age well.",
    size: 10,
    gap: 10,
  },
  {
    text: "Less theater. More shipping. If it needs to work under pressure, I want my name on it.",
    size: 10,
    gap: 24,
  },
  { text: "SKILLS", size: 11, gap: 14 },
  {
    text: "PHP, Laravel, React, Next.js, Node.js, MySQL, C, ASP.NET, Tailwind CSS",
    size: 10,
    gap: 24,
  },
  { text: "SELECTED WORK", size: 11, gap: 14 },
  { text: "StrideWear — Fashion e-commerce storefront. Next.js, UI.", size: 10, gap: 10 },
  {
    text: "ZAS Architects & Interiors — Studio site for a design firm. Next.js, branding.",
    size: 10,
    gap: 10,
  },
  {
    text: "Personal Portfolio — Mixed type, motion, dark studio atmosphere. Next.js, Tailwind.",
    size: 10,
    gap: 24,
  },
  { text: "SERVICES", size: 11, gap: 14 },
  { text: "Websites & landing pages, ecommerce, redesigns, CMS & admin systems,", size: 10, gap: 10 },
  { text: "integrations, and care & fixes after launch.", size: 10, gap: 0 },
];

function wrap(text, size, maxWidth) {
  const widthOf = (s) => s.length * size * 0.5;
  if (widthOf(text) <= maxWidth) return [text];
  const words = text.split(" ");
  const out = [];
  let current = "";
  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (widthOf(next) > maxWidth && current) {
      out.push(current);
      current = word;
    } else {
      current = next;
    }
  }
  if (current) out.push(current);
  return out;
}

function pdfEscape(text) {
  return text.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

const pageW = 612;
const pageH = 792;
const margin = 72;
const maxWidth = pageW - margin * 2;
let y = pageH - 84;
const ops = ["BT", "/F1 12 Tf", "0.08 0.09 0.1 rg"];

for (const line of lines) {
  const wrapped = wrap(line.text, line.size, maxWidth);
  for (const [i, part] of wrapped.entries()) {
    ops.push(`/F1 ${line.size} Tf`);
    ops.push(`1 0 0 1 ${margin} ${y} Tm`);
    ops.push(`(${pdfEscape(part)}) Tj`);
    y -= i === wrapped.length - 1 ? line.gap + 4 : line.size + 4;
  }
}
ops.push("ET");
const stream = ops.join("\n");

const objects = [
  "1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n",
  "2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n",
  `3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageW} ${pageH}] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>\nendobj\n`,
  `4 0 obj\n<< /Length ${Buffer.byteLength(stream)} >>\nstream\n${stream}\nendstream\nendobj\n`,
  "5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n",
];

let pdf = "%PDF-1.4\n";
const offsets = [0];
for (const obj of objects) {
  offsets.push(Buffer.byteLength(pdf));
  pdf += obj;
}
const xrefStart = Buffer.byteLength(pdf);
let xref = `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
for (let i = 1; i < offsets.length; i++) {
  xref += `${String(offsets[i]).padStart(10, "0")} 00000 n \n`;
}
pdf += xref;
pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF\n`;

const out = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "Tayyaba-Ahmed-CV.pdf");
writeFileSync(out, pdf);
console.log(`Wrote ${out}`);
