// utils/pdf.js
import pdfParse from "pdf-parse";

export async function extractTextFromPdf(buffer) {
  const data = await pdfParse(buffer);
  // basic clean
  return (data.text || "").replace(/\s+/g, " ").trim();
}
