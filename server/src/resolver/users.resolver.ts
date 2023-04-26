import { Request, Response } from "express";
import { handler } from "../utils/utils";
import { UserRepository } from "../repository/user.repository";

export async function usersResolver(request: Request, response: Response) {
  handler(request, response, async () => {
    return await UserRepository.find();
  });
}
