"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const opremaController_1 = require("../controllers/opremaController");
const router = (0, express_1.Router)();
router.get("/", opremaController_1.getOprema);
exports.default = router;
