"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const brendController_1 = require("../controllers/brendController");
const upload_1 = require("../middlewares/upload");
const auth_1 = require("../middlewares/auth");
const zod_1 = __importDefault(require("zod"));
const validate_1 = require("../middlewares/validate");
const router = (0, express_1.Router)();
const createBrendObject = zod_1.default.object({
    body: zod_1.default.object({
        naziv: zod_1.default.string().min(1),
    }),
});
router.get("/", brendController_1.getBrends);
router.post("/", auth_1.requireAdmin, upload_1.upload.array("logo", 1), (0, validate_1.validate)(createBrendObject), brendController_1.createBrend);
exports.default = router;
