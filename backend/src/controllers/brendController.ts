import { Request, Response } from "express";
import prisma from "../utils/prisma";



export const getBrends = async (req: Request, res: Response) => {
    try {
        const brend = await prisma.brend.findMany();

        if (!brend) {
            return res.status(404).json({ message: "Brend not found" });
        }
        res.json(brend);
    } catch (error) {
        return res.status(500).json({ message: "Failed to fetch brends" });
    }
}