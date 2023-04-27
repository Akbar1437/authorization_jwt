import { UserType } from "./user";

export type AuthResponseType = {
  accessToken: string;
  refreshToken: string;
  user: UserType;
};
