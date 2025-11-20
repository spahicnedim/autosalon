import { Router } from "express";
import z from "zod";
import { requireAdmin } from "../middlewares/auth";
import { validate } from "../middlewares/validate";
import {
  createCar,
  deleteCar,
  getCarById,
  getCars,
  incrementCarViews,
  updateCar,
} from "../controllers/carsController";
import { upload } from "../middlewares/upload";

const router = Router();

const createCarSchema = z.object({
  body: z.object({
    brendId: z.preprocess((val) => Number(val), z.number().int().positive()),
    model: z.string().min(1),
    godina: z.preprocess(
      (val) => Number(val),
      z.number().int().min(1900).max(new Date().getFullYear()),
    ),
    cijena: z.preprocess((val) => Number(val), z.number().positive()),
    oblikKaroserije: z.string().min(1),
    gorivo: z.string().min(1),
    mjenjac: z.string().min(1),
    boja: z.string().min(1),
    snaga: z.preprocess((val) => Number(val), z.number().positive()),
    zapremina: z.preprocess((val) => Number(val), z.number().positive()),
    kilometraza: z.preprocess((val) => Number(val), z.number().nonnegative()),
    opis: z.string(),
  }),
});

const updateCarSchema = z.object({
  body: z.object({
    brendId: z.number().int().positive().optional(),
    model: z.string().min(1).optional(),
    godina: z.number().int().min(1900).max(new Date().getFullYear()).optional(),
    cijena: z.number().positive().optional(),
    oblikKaroserije: z.string().min(1).optional(),
    gorivo: z.string().min(1).optional(),
    mjenjac: z.string().min(1).optional(),
    boja: z.string().min(1).optional(),
    snaga: z.number().positive().optional(),
    zapremina: z.number().positive().optional(),
    kilometraza: z.number().int().nonnegative().optional(),
    opis: z.string().optional(),
  }),
});

router.get("/", getCars);
router.get("/:id", getCarById);
router.post(
  "/",
  requireAdmin,
  upload.array("slike", 10),
  validate(createCarSchema),
  createCar,
);
router.put(
  "/:id",
  requireAdmin,
  upload.array("slike", 10),
  validate(updateCarSchema),
  updateCar,
);
router.delete("/:id", requireAdmin, deleteCar);
router.put("/:id/view", incrementCarViews);

export default router;
