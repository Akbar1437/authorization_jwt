import { NextFunction, Request, Response } from "express";
import { tokenService } from "../service/token.service";
import { JwtPayload } from "jsonwebtoken";
export interface CustomRequest extends Request {
  user: string | JwtPayload;
}
export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      res.status(401);
      res.json({ status: "Not authorized." });
      return;
    }

    const accessToken = authHeader.split(" ")[1];

    if (!accessToken) {
      res.status(403);
      res.json({ status: "Not authenticated" });
      return;
    }

    const userPayload = tokenService.validateAccessToken(accessToken);

    if (!userPayload) {
      res.status(403);
      res.json({ status: "Not authenticated" });
      return;
    }

    (req as CustomRequest).user = userPayload;

    next();
  } catch (err) {
    res.status(401);
    res.json({ status: "Invalid token" });
    return next(err);
  }
}
