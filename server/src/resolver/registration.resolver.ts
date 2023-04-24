import { Request, Response } from "express";
import { handler } from "../utils/utils";
import { UserService } from "../service";

export async function registrationResolver(
  request: Request,
  response: Response
) {
  handler(request, response, async () => {
    const { email, password } = request.body;
    const userService = new UserService();
    const user = await userService.registration(email, password);
    response.cookie("refreshToken", user.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return user;
  });
}
