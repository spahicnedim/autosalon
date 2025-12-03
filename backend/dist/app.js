"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const dotenv_1 = __importDefault(require("dotenv"));
const cars_1 = __importDefault(require("./routes/cars"));
const auth_1 = __importDefault(require("./routes/auth"));
const brend_1 = __importDefault(require("./routes/brend"));
const oprema_1 = __importDefault(require("./routes/oprema"));
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
dotenv_1.default.config();
const app = (0, express_1.default)();
//middlewares
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: process.env.CORS_ORIGIN?.split(",") || ["http://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
//rate limiter
const limiter = (0, express_rate_limit_1.default)({
    windowMs: (Number(process.env.RATE_LIMIT_WINDOW_MINUTES) || 15) * 60 * 1000, // 15 minutes
    max: Number(process.env.RATE_LIMIT_MAX) || 200,
    standardHeaders: true,
    legacyHeaders: false,
});
app.use(limiter);
// routes
app.use("/api/auth", auth_1.default);
app.use("/api/cars", cars_1.default);
app.use("/api/brend", brend_1.default);
app.use("/api/oprema", oprema_1.default);
// healt
app.get("/health", (req, res) => res.json({ ok: true }));
app.use(errorHandler_1.default);
exports.default = app;
