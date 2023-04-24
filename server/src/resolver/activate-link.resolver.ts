import { Request, Response } from "express";
import { handler } from "../utils/utils";
import { UserService } from "../service";

export async function activationLinkResolver(
  request: Request,
  response: Response
) {
  handler(request, response, async () => {
    const activationLink = request.params.link;
    console.log("activationLink", activationLink);
    const userService = new UserService();
    await userService.activate(activationLink);
    return response.redirect(process.env.CLIENT_URL!);
  });
}
