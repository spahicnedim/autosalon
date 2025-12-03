"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const zod_1 = __importDefault(require("zod"));
const auth_1 = require("../middlewares/auth");
const validate_1 = require("../middlewares/validate");
const carsController_1 = require("../controllers/carsController");
const upload_1 = require("../middlewares/upload");
const router = (0, express_1.Router)();
const createCarSchema = zod_1.default.object({
    body: zod_1.default.object({
        brendId: zod_1.default.preprocess((val) => Number(val), zod_1.default.number().int().positive()),
        model: zod_1.default.string().min(1),
        godina: zod_1.default.preprocess((val) => Number(val), zod_1.default.number().int().min(1900).max(new Date().getFullYear())),
        cijena: zod_1.default.preprocess((val) => Number(val), zod_1.default.number().positive()),
        oblikKaroserije: zod_1.default.string().min(1),
        gorivo: zod_1.default.string().min(1),
        mjenjac: zod_1.default.string().min(1),
        boja: zod_1.default.string().min(1),
        snaga: zod_1.default.preprocess((val) => Number(val), zod_1.default.number().positive()),
        zapremina: zod_1.default.preprocess((val) => Number(val), zod_1.default.number().positive()),
        kilometraza: zod_1.default.preprocess((val) => Number(val), zod_1.default.number().nonnegative()),
        opis: zod_1.default.string(),
    }),
});
const updateCarSchema = zod_1.default.object({
    body: zod_1.default.object({
        brendId: zod_1.default.number().int().positive().optional(),
        model: zod_1.default.string().min(1).optional(),
        godina: zod_1.default.number().int().min(1900).max(new Date().getFullYear()).optional(),
        cijena: zod_1.default.number().positive().optional(),
        oblikKaroserije: zod_1.default.string().min(1).optional(),
        gorivo: zod_1.default.string().min(1).optional(),
        mjenjac: zod_1.default.string().min(1).optional(),
        boja: zod_1.default.string().min(1).optional(),
        snaga: zod_1.default.number().positive().optional(),
        zapremina: zod_1.default.number().positive().optional(),
        kilometraza: zod_1.default.number().int().nonnegative().optional(),
        opis: zod_1.default.string().optional(),
    }),
});
router.get("/", carsController_1.getCars);
router.get("/:id", carsController_1.getCarById);
router.post("/", auth_1.requireAdmin, upload_1.upload.array("slike", 10), (0, validate_1.validate)(createCarSchema), carsController_1.createCar);
router.put("/:id", auth_1.requireAdmin, upload_1.upload.array("slike", 10), (0, validate_1.validate)(updateCarSchema), carsController_1.updateCar);
router.delete("/:id", auth_1.requireAdmin, carsController_1.deleteCar);
router.put("/:id/view", carsController_1.incrementCarViews);
exports.default = router;
