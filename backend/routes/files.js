
import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import { requireAuth } from "../middleware/auth.js";
import { extractTextFromPdf } from "../utils/pdf.js";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

const UPLOAD_DIR = process.env.UPLOAD_DIR || "uploads";


const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });


let files = [];


router.post("/upload", requireAuth, upload.single("file"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });
    const raw = fs.readFileSync(req.file.path);
    const text = await extractTextFromPdf(raw);

    const fileRecord = {
      id: uuidv4(),
      filename: req.file.filename,
      originalName: req.file.originalname,
      text,
      uploadedAt: Date.now()
    };
    files.push(fileRecord);
    res.json({ success: true, file: { id: fileRecord.id, name: fileRecord.originalName } });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ error: "Failed to process PDF" });
  }
});


router.get("/", requireAuth, (req, res) => {
  res.json(files.map(f => ({ id: f.id, name: f.originalName, uploadedAt: f.uploadedAt })));
});


router.delete("/:id", requireAuth, (req, res) => {
  const id = req.params.id;
  const idx = files.findIndex(f => f.id === id);
  if (idx === -1) return res.status(404).json({ error: "File not found" });

  const file = files[idx];

  const p = path.join(UPLOAD_DIR, file.filename);
  try { if (fs.existsSync(p)) fs.unlinkSync(p); } catch (e) { console.warn("can't delete file:", e); }
  files.splice(idx, 1);
  res.json({ success: true });
});


export function getFileById(fileId) {
  return files.find(f => f.id === fileId);
}

export default router;
