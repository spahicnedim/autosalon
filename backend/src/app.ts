import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import carsRouter from "./routes/cars";
import authRouter from "./routes/auth";
import brendRouter from "./routes/brend";
import opremaRouter from "./routes/oprema";
import errorHandler from "./middlewares/errorHandler";

dotenv.config();

const app = express();

//middlewares
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.CORS_ORIGIN?.split(",") || ["http://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

//rate limiter

const limiter = rateLimit({
  windowMs: (Number(process.env.RATE_LIMIT_WINDOW_MINUTES) || 15) * 60 * 1000, // 15 minutes
  max: Number(process.env.RATE_LIMIT_MAX) || 200,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);

// routes
app.use("/api/auth", authRouter);
app.use("/api/cars", carsRouter);
app.use("/api/brend", brendRouter)
app.use("/api/oprema", opremaRouter);

// healt
app.get("/health", (req, res) => res.json({ ok: true }));

app.use(errorHandler);

export default app;





