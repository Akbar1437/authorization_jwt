import { Request, Response } from "express";
import { handler } from "../utils/utils";

export async function activationLinkResolver(
  request: Request,
  response: Response
) {
  handler(request, response, async () => {});
}
