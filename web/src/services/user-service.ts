import { AxiosResponse } from "axios";
import { $api } from "../http";
import { UserType } from "../types/user";

export class UserService {
  static async fetchUsers(): Promise<AxiosResponse<UserType[]>> {
    return $api.get<UserType[]>("/users");
  }
}
