import { Request, Response } from "express";
import prisma from "../utils/prisma";

export const getOprema = async (req: Request, res: Response) => {
  try {
    const oprema = await prisma.oprema.findMany();
    console.log("Oprema iz baze:", oprema);

    res.json({ data: oprema });
  } catch (error) {
    console.error("Fetch oprema error:", error);
    res.status(500).json({ message: "Failed to fetch oprema" });
  }
};
