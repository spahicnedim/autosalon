declare global {
  namespace Express {
    interface Request {
      user?: { username: string };
    }
  }
}

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const requireAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const token = auth.split(" ")[1];
  try {
    const secret = process.env.JWT_SECRET || "secret";
    const payload = jwt.verify(token, secret) as any;
    if (!payload.username)
      return res.status(401).json({ error: "Unauthorized" });
    req.user = { username: payload.username };
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
};
