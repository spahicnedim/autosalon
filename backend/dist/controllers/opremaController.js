"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOprema = void 0;
const prisma_1 = __importDefault(require("../utils/prisma"));
const getOprema = async (req, res) => {
    try {
        const oprema = await prisma_1.default.oprema.findMany();
        console.log("Oprema iz baze:", oprema);
        res.json({ data: oprema });
    }
    catch (error) {
        console.error("Fetch oprema error:", error);
        res.status(500).json({ message: "Failed to fetch oprema" });
    }
};
exports.getOprema = getOprema;
