import {Router} from "express";
import {getOprema} from "../controllers/opremaController";

const router = Router();

router.get("/", getOprema);

export default router;