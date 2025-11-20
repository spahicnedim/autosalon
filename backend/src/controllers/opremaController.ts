import { Request, Response } from "express";
import prisma from "../utils/prisma";

export const getOprema = async (req: Request, res: Response) => {
    try {
        const oprema = await prisma.oprema.findMany();

        if (!oprema || oprema.length === 0) {
            return res.status(404).json({ message: "No equipment found" });
        }

        res.json(oprema);
    } catch (error) {
        console.error("Fetch oprema error:", error);
        return res.status(500).json({ message: "Failed to fetch oprema" });
    }
};
