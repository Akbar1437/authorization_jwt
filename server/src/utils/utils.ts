import { Request, Response } from "express";

export async function handler(
  req: Request,
  res: Response,
  callback: (req: Request, res: Response) => any
) {
  try {
    let result = callback(req, res);
    if (result instanceof Promise) {
      result = await result;
    }
    if (result !== undefined && result !== null) {
      res.json(result);
    } else {
      res.json({ status: "ok" });
    }
  } catch (e: unknown) {
    console.error(e);
    res.status(500);
    if (e instanceof Error) {
      res.json({
        status: "fail",
        error: e.message,
      });
    } else {
      res.json(JSON.stringify(e));
    }
  }
}
