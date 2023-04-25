import { Request, Response } from "express";
import { handler } from "../utils/utils";
import { userService } from "../service/user.service";

export async function refreshResolver(request: Request, response: Response) {
  handler(request, response, async () => {
    const { refreshToken } = request.cookies;
    const user = await userService.refresh(refreshToken);
    response.cookie("refreshToken", user.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return user;
  });
}
