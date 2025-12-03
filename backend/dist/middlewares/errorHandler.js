"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../utils/logger"));
const errorHandler = (err, _req, res, _next) => {
    logger_1.default.error(err);
    const status = err.status || 500;
    const message = err.message || "Internal Server Error";
    // @ts-ignore
    res.status(status).json({ error: message });
};
exports.default = errorHandler;
