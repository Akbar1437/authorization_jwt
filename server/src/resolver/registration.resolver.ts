import { Request, Response } from "express";
import { handler } from "../utils/utils";
import { userService } from "../service";
import { validationResult } from "express-validator";

export async function registrationResolver(
  request: Request,
  response: Response
) {
  handler(request, response, async () => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      throw new Error("Validation error please check your email or password");
    }
    const { email, password } = request.body;
    const user = await userService.registration(email, password);
    response.cookie("refreshToken", user.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return user;
  });
}
