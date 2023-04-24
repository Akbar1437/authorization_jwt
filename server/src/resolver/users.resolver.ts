import { Request, Response } from "express";
import { handler } from "../utils/utils";

export async function usersResolver(request: Request, response: Response) {
  handler(request, response, async () => {});
}
