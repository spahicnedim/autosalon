import { Request, Response } from "express";
import prisma from "../utils/prisma";

export const getKaroserija = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const karoserija = await prisma.karoserija.findMany();
    console.log("karoserija iz baze:", karoserija);

    res.json({ data: karoserija });
  } catch (error) {
    console.error("Fetch karoserija error:", error);
    res.status(500).json({ message: "Failed to fetch karoserija" });
  }
};

export const createKaroserija = async (req: Request, res: Response) => {
  try {
    const { naziv } = req.body;
    // @ts-ignore
    const karoserija = await prisma.karoserija.create({ data: { naziv } });
    res.status(201).json(karoserija);
  } catch (error) {
    console.error("Create karoserija error:", error);
    res.status(500).json({ message: "Failed to create karoserija" });
  }
};
