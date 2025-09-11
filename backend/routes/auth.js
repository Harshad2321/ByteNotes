// routes/auth.js
import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

// Simple hardcoded test user for hackathon
const TEST_USER = { email: "test@test.com", password: "123456", name: "Test User" };

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: "Missing email or password" });

  if (email === TEST_USER.email && password === TEST_USER.password) {
    const token = jwt.sign({ email: TEST_USER.email, name: TEST_USER.name }, JWT_SECRET, { expiresIn: "4h" });
    return res.json({ token, user: { email: TEST_USER.email, name: TEST_USER.name } });
  }
  return res.status(401).json({ error: "Invalid credentials" });
});

router.get("/me", (req, res) => {
  // optional: auth middleware could be used; for quick check accept token header
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: "No token" });
  const token = auth.split(" ")[1];
  try {
    const user = jwt.verify(token, JWT_SECRET);
    return res.json({ user });
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }
});

export default router;
