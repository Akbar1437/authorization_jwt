import { UserModel } from "../model";

export class UserDTO {
  id: string;
  isActivated: boolean;
  email: string;

  constructor(model: UserModel) {
    this.id = model.id;
    this.email = model.email;
    this.isActivated = model.isActivated;
  }
}
