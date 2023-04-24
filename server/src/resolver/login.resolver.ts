import { Request, Response } from "express";
import { handler } from "../utils/utils";

export async function loginResolver(request: Request, response: Response) {
  handler(request, response, async () => {});
}
