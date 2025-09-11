// routes/ai.js
import express from "express";
import { requireAuth } from "../middleware/auth.js";
import { getFileById } from "./files.js";
import fetch from "node-fetch";

const router = express.Router();

const HF_API_KEY = process.env.HF_API_KEY;
const HF_MODEL = process.env.HF_MODEL || "mistralai/Mistral-7B-Instruct-v0.2";

// Utility: call Hugging Face model via inference API (text generation)
async function askHuggingFace(question, context) {
  const promptSystem = `You are a helpful study assistant. Answer concisely, use bullets where helpful.`;
  const prompt = `${promptSystem}\n\nContext:\n${context}\n\nQuestion: ${question}\nAnswer:`;

  const url = `https://api-inference.huggingface.co/models/${encodeURIComponent(HF_MODEL)}`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${HF_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      inputs: prompt,
      parameters: { max_new_tokens: 300, return_full_text: false }
    }),
    timeout: 120000
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`HF Error ${res.status}: ${txt}`);
  }

  const data = await res.json();
  // data can be array or object depending on model
  // try common fields
  if (Array.isArray(data) && data[0]?.generated_text) return data[0].generated_text;
  if (data.generated_text) return data.generated_text;
  if (Array.isArray(data) && data[0]?.error) throw new Error(data[0].error);
  return JSON.stringify(data);
}

// AI ask endpoint
router.post("/ask", requireAuth, async (req, res) => {
  try {
    const { question, fileId } = req.body;
    if (!question || !fileId) return res.status(400).json({ error: "Missing question or fileId" });

    const file = getFileById(fileId);
    if (!file) return res.status(404).json({ error: "File not found" });

    const answer = await askHuggingFace(question, file.text);
    // For hackathon, store history in memory:
    if (!global.qnaHistory) global.qnaHistory = [];
    global.qnaHistory.push({ id: Date.now().toString(), fileId, question, answer, at: Date.now(), user: req.user?.email });

    res.json({ answer });
  } catch (err) {
    console.error("AI error:", err?.message || err);
    res.status(500).json({ error: "AI request failed", details: err?.message || String(err) });
  }
});

router.get("/history", requireAuth, (req, res) => {
  res.json(global.qnaHistory || []);
});

export default router;
