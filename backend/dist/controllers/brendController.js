"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBrend = exports.getBrends = void 0;
const prisma_1 = __importDefault(require("../utils/prisma"));
const wasabi_1 = require("../services/wasabi");
const getBrends = async (req, res) => {
    try {
        const brend = await prisma_1.default.brend.findMany();
        if (!brend) {
            return res.status(404).json({ message: "Brend not found" });
        }
        res.json(brend);
    }
    catch (error) {
        return res.status(500).json({ message: "Failed to fetch brends" });
    }
};
exports.getBrends = getBrends;
const createBrend = async (req, res) => {
    try {
        const { naziv } = req.body;
        if (!naziv) {
            return res.status(400).json({ message: "Naziv brenda je obavezan" });
        }
        if (!req.file) {
            return res.status(400).json({ message: "Slika brenda je obavezna" });
        }
        const file = req.file;
        const timestamp = Date.now();
        const safeName = file.originalname.replace(/[^a-zA-Z0-9._-]/g, "_");
        const key = `brend/${timestamp}-${safeName}`;
        const url = await (0, wasabi_1.uploadToWasabi)(file.buffer, key, {
            contentType: file.mimetype,
            cacheControl: "public, max-age=31536000, immutable",
        });
        const brend = await prisma_1.default.brend.create({
            data: {
                naziv,
                logo: url,
            },
        });
        res.status(201).json(brend);
    }
    catch (error) {
        console.error("Create brend error:", error);
        res.status(500).json({ message: "Failed to create brend" });
    }
};
exports.createBrend = createBrend;
