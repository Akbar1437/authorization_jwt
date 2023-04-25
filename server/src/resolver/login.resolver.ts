import { Request, Response } from "express";
import { userService } from "../service";
import { handler } from "../utils/utils";

export async function loginResolver(request: Request, response: Response) {
  handler(request, response, async () => {
    const { email, password } = request.body;
    const user = await userService.login(email, password);
    response.cookie("refreshToken", user.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return user;
  });
}
