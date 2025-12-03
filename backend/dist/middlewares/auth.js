"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAdmin = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const requireAdmin = (req, res, next) => {
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    const token = auth.split(" ")[1];
    try {
        const secret = process.env.JWT_SECRET || "secret";
        const payload = jsonwebtoken_1.default.verify(token, secret);
        if (!payload.username)
            return res.status(401).json({ error: "Unauthorized" });
        req.user = { username: payload.username };
        next();
    }
    catch (error) {
        return res.status(401).json({ error: "Invalid token" });
    }
};
exports.requireAdmin = requireAdmin;
