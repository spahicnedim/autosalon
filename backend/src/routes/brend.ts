import {Router} from "express";
import {getBrends} from "../controllers/brendController";

const router = Router();

router.get("/", getBrends);

export default router;