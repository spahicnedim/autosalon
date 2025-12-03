"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = require("express");
const zod_1 = __importDefault(require("zod"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const router = (0, express_1.Router)();
const loginSchema = zod_1.default.object({
    body: zod_1.default.object({
        username: zod_1.default.string().min(1),
        password: zod_1.default.string().min(1),
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
    const token = jsonwebtoken_1.default.sign({ username }, process.env.JWT_SECRET || "secret", {
        expiresIn: "12h",
    });
    console.log("✅ Login success");
    res.json({ token });
});
exports.default = router;
