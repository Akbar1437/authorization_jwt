export type UserModel = {
  id: string;
  email: string;
  password: string;
  isActivated: boolean;
  activationLink: string;
};
