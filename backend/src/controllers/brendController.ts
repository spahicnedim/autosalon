import { Request, Response } from "express";
import prisma from "../utils/prisma";
import { uploadToWasabi } from "../services/wasabi";

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
};

export const createBrend = async (req: Request, res: Response) => {
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

    const url = await uploadToWasabi(file.buffer, key, {
      contentType: file.mimetype,
      cacheControl: "public, max-age=31536000, immutable",
    });

    const brend = await prisma.brend.create({
      data: {
        naziv,
        logo: url,
      },
    });

    res.status(201).json(brend);
  } catch (error) {
    console.error("Create brend error:", error);
    res.status(500).json({ message: "Failed to create brend" });
  }
};
