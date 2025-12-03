import { Router } from "express";
import { createOprema, getOprema } from "../controllers/opremaController";
import { requireAdmin } from "../middlewares/auth";
import { upload } from "../middlewares/upload";
import { validate } from "../middlewares/validate";
import z from "zod";
import {
  createKaroserija,
  getKaroserija,
} from "../controllers/karoserijaController";

const router = Router();

const createKaroserijaObject = z.object({
  body: z.object({
    naziv: z.string().min(1),
  }),
});

router.get("/", getKaroserija);
router.post(
  "/",
  requireAdmin,
  validate(createKaroserijaObject),
  createKaroserija,
);

export default router;
