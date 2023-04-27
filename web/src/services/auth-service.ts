import { AxiosResponse } from "axios";
import { $api } from "../http";
import { AuthResponseType } from "../types/response";

export class AuthService {
  static async login(
    email: string,
    password: string
  ): Promise<AxiosResponse<AuthResponseType>> {
    return $api.post<AuthResponseType>("/login", { email, password });
  }

  static async registration(
    email: string,
    password: string
  ): Promise<AxiosResponse<AuthResponseType>> {
    return $api.post<AuthResponseType>("/registration", { email, password });
  }

  static async logout(): Promise<void> {
    return $api.post("/logout");
  }
}
