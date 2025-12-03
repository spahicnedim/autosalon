import { Router } from "express";
import { createBrend, getBrends } from "../controllers/brendController";
import { upload } from "../middlewares/upload";
import { requireAdmin } from "../middlewares/auth";
import z from "zod";
import { validate } from "../middlewares/validate";

const router = Router();

const createBrendObject = z.object({
  body: z.object({
    naziv: z.string().min(1),
  }),
});

router.get("/", getBrends);
router.post(
  "/",
  requireAdmin,
  upload.single("logo"),
  validate(createBrendObject),
  createBrend,
);

export default router;
