// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import multer from "multer";
import fs from "fs";
import { createRequire } from "module";

// Create require function for ES modules
const require = createRequire(import.meta.url);

dotenv.config();
const app = express();

// ===== CORS Configuration =====
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// ===== Dummy User (Hackathon style) =====
const USER = { email: "test@test.com", password: "123456" };

// ===== In-Memory File Store =====
let files = [];

// ===== Multer Config =====
const upload = multer({ dest: "uploads/" });

// ===== Auth Middleware =====
function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized - No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.error("Token verification failed:", err);
    res.status(401).json({ error: "Invalid token" });
  }
}

// ===== Root Route =====
app.get("/", (req, res) => {
  res.json({ 
    message: "StudyBuddy Backend API is running!",
    endpoints: [
      "POST /api/auth/login",
      "POST /api/files/upload", 
      "POST /api/ai/ask",
      "GET /api/files"
    ]
  });
});

// ===== Auth Routes =====
app.post("/api/auth/login", (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }
    
    if (email === USER.email && password === USER.password) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1h" });
      return res.json({ 
        success: true,
        token,
        message: "Login successful",
        user: { email }
      });
    }
    
    res.status(401).json({ error: "Invalid credentials" });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Login failed" });
  }
});

// ===== File Upload Routes =====
app.post("/api/files/upload", authMiddleware, upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    console.log("Processing uploaded file:", req.file.originalname);

    // Use CommonJS require for pdf-parse
    const pdfParse = require('pdf-parse');
    
    const filePath = req.file.path;
    const dataBuffer = fs.readFileSync(filePath);
    const pdfData = await pdfParse(dataBuffer);
    
    const fileRecord = {
      id: Date.now(),
      originalName: req.file.originalname,
      filename: req.file.filename,
      text: pdfData.text,
      pages: pdfData.numpages,
      uploadDate: new Date().toISOString(),
    };
    
    files.push(fileRecord);
    
    // Clean up uploaded file
    fs.unlinkSync(filePath);
    
    console.log(`File processed successfully: ${pdfData.numpages} pages, ${pdfData.text.length} characters`);
    
    res.json({
      success: true,
      file: {
        id: fileRecord.id,
        name: fileRecord.originalName,
        pages: fileRecord.pages,
        textLength: fileRecord.text.length
      },
      message: "File uploaded and processed successfully"
    });
  } catch (error) {
    console.error("File upload error:", error);
    res.status(500).json({ error: "Failed to process PDF" });
  }
});

// ===== Get Files Route =====
app.get("/api/files", authMiddleware, (req, res) => {
  try {
    const fileList = files.map(file => ({
      id: file.id,
      name: file.originalName,
      pages: file.pages,
      uploadDate: file.uploadDate,
      textLength: file.text.length
    }));
    
    res.json({
      success: true,
      files: fileList,
      count: fileList.length
    });
  } catch (error) {
    console.error("Get files error:", error);
    res.status(500).json({ error: "Failed to retrieve files" });
  }
});

// ===== AI Routes =====
app.post('/api/ai/ask', authMiddleware, async (req, res) => {
  try {
    const { question, fileId, file } = req.body;
    
    if (!question) {
      return res.status(400).json({ error: 'Question is required' });
    }
    
    let pdfText = '';
    
    // Handle both file upload (base64) and file ID scenarios
    if (file && file.base64Content) {
      console.log("Processing direct file upload for AI query");
      // Direct file upload scenario
      const pdfParse = require('pdf-parse');
      const pdfBuffer = Buffer.from(file.base64Content, 'base64');
      const pdfData = await pdfParse(pdfBuffer);
      pdfText = pdfData.text;
    } else if (fileId) {
      console.log("Using previously uploaded file:", fileId);
      // File ID scenario
      const fileRecord = files.find(f => f.id === parseInt(fileId));
      if (!fileRecord) {
        return res.status(404).json({ error: 'File not found' });
      }
      pdfText = fileRecord.text;
    } else {
      return res.status(400).json({ error: 'Either file or fileId is required' });
    }
    
    console.log('PDF text extracted, length:', pdfText.length);
    
    // Prepare the prompt with actual PDF content
    const prompt = `[INST] You are a helpful assistant that analyzes documents and answers questions about them.

Document Content:
${pdfText.substring(0, 3000)} ${pdfText.length > 3000 ? '...(content continues)' : ''}

User Question: ${question}

Please provide a detailed answer based on the document content above. [/INST]`;

    console.log('Calling Hugging Face API...');
    
    // Call Hugging Face API with PDF content
    const response = await fetch(`https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.HF_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          max_new_tokens: 500,
          temperature: 0.7,
          return_full_text: false,
        }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Hugging Face API response:', response.status, errorText);
      throw new Error(`Hugging Face API error: ${response.status} - ${errorText}`);
    }

    const result = await response.json();
    console.log('HF API result received');
    
    let answer = 'Sorry, I could not generate an answer.';
    
    if (Array.isArray(result) && result.length > 0) {
      answer = result[0].generated_text || answer;
    } else if (result.generated_text) {
      answer = result.generated_text;
    }
    
    res.json({ 
      success: true,
      answer: answer.trim(),
      question: question
    });
  } catch (error) {
    console.error('AI processing error:', error);
    res.status(500).json({ error: 'Failed to communicate with AI service' });
  }
});

// ===== Legacy endpoint for backward compatibility =====
app.post('/api/ask', async (req, res) => {
  try {
    const { question, file } = req.body;
    if (!question || !file || !file.base64Content || !file.mimeType) {
      return res.status(400).json({ error: 'Missing required fields.' });
    }
    
    console.log("Legacy endpoint called with question:", question);
    
    // Use CommonJS require for pdf-parse to avoid module issues
    const pdfParse = require('pdf-parse');
    
    // Convert base64 to buffer and extract text from PDF
    const pdfBuffer = Buffer.from(file.base64Content, 'base64');
    console.log('PDF buffer created, size:', pdfBuffer.length);
    
    const pdfData = await pdfParse(pdfBuffer);
    const pdfText = pdfData.text;
    
    console.log('PDF text extracted, length:', pdfText.length);
    console.log('PDF preview:', pdfText.substring(0, 200));
    
    // Simple response for now - return the PDF content summary
    const summary = `Based on the PDF content, here's what I found:

Content Length: ${pdfText.length} characters
Pages: ${pdfData.numpages}

Content Preview:
${pdfText.substring(0, 1000)}${pdfText.length > 1000 ? '...' : ''}

Your question: "${question}"

This document appears to contain information about ${pdfText.includes('machine learning') ? 'machine learning' : pdfText.includes('web development') ? 'web development' : pdfText.includes('full stack') ? 'full stack development' : 'technical content'}.`;
    
    res.json({ answer: summary });
  } catch (error) {
    console.error('Error processing PDF:', error);
    res.status(500).json({ error: 'Failed to process PDF: ' + error.message });
  }
});

// ===== Error Handling Middleware =====
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// ===== Start Server =====
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 StudyBuddy Backend running on http://localhost:${PORT}`);
  console.log(`📋 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔑 HF Token configured: ${process.env.HF_TOKEN ? 'Yes' : 'No'}`);
  console.log(`🔐 JWT Secret configured: ${process.env.JWT_SECRET ? 'Yes' : 'No'}`);
});
