import * as jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

export function authorizationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers["authorization"];

  if (!token) {
    res.status(401);
    res.json({ status: "Not authorized." });
    return;
  }

  try {
    const decryptedToken = jwt.verify(token, process.env.JWT_ACCESS_SECRET!);

    if (typeof decryptedToken !== "string") {
      res.status(403);
      res.json({ status: "Not authenticated" });
      return;
    } else {
      next();
    }
  } catch (err) {
    res.status(401);
    res.json({ status: "Invalid token" });
    return;
  }
}
