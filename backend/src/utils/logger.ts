import pino from "pino";

const logger = pino({
  level: process.env.NODE_ENV === "development" ? "info" : "debug",
  transport:
    process.env.NODE_ENV !== "production"
      ? {
          target: "pino-pretty",
          options: { colorize: true },
        }
      : undefined,
});

export default logger;
