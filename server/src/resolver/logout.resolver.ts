import { Request, Response } from "express";
import { handler } from "../utils/utils";

export async function logoutResolver(request: Request, response: Response) {
  handler(request, response, async () => {});
}
