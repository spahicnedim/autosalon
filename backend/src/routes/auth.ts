import dotenv from "dotenv";
import { Router } from "express";
import z from "zod";
import { validate } from "../middlewares/validate";
import jwt from "jsonwebtoken";

dotenv.config();

const router = Router();

const loginSchema = z.object({
  body: z.object({
    username: z.string().min(1),
    password: z.string().min(1),
  }),
});

router.post("/login", (req, res) => {
  console.log("➡️ Reached login route");
  const { username, password } = req.body;
  console.log("Body:", req.body);

  const ADMIN_USER = process.env.ADMIN_USER;
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
  console.log("ENV:", ADMIN_USER, ADMIN_PASSWORD);

  if (username !== ADMIN_USER || password !== ADMIN_PASSWORD) {
    console.log("❌ Invalid credentials");
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ username }, process.env.JWT_SECRET || "secret", {
    expiresIn: "12h",
  });

  console.log("✅ Login success");
  res.json({ token });
});

export default router;
