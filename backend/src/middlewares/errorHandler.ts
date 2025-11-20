import logger from "../utils/logger";
import { Request, Response, NextFunction } from "express";

const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  logger.error(err);
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  // @ts-ignore
  res.status(status).json({ error: message });
};

export default errorHandler;
