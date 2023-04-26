import { Request, Response } from "express";
import { userService } from "../service";

export async function activationLinkResolver(
  request: Request,
  response: Response
) {
  try {
    const activationLink = request.params.link;
    await userService.activate(activationLink);
    return response.redirect(process.env.CLIENT_URL!);
  } catch (e) {
    console.log(e);
  }
}
