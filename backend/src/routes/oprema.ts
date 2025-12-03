import { Router } from "express";
import { createOprema, getOprema } from "../controllers/opremaController";
import { requireAdmin } from "../middlewares/auth";
import { upload } from "../middlewares/upload";
import { validate } from "../middlewares/validate";
import z from "zod";

const router = Router();

const createOpremaObject = z.object({
  body: z.object({
    naziv: z.string().min(1),
  }),
});

router.get("/", getOprema);
router.post("/", requireAdmin, validate(createOpremaObject), createOprema);

export default router;
