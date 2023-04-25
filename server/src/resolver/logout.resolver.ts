import { Request, Response } from "express";
import { handler } from "../utils/utils";
import { userService } from "../service";

export async function logoutResolver(request: Request, response: Response) {
  handler(request, response, async () => {
    const { refreshToken } = request.cookies;
    const token = await userService.logout(refreshToken);
    response.clearCookie("refreshToken");
    return token;
  });
}
