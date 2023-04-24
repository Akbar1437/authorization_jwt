import { UserDTO } from "../dtos/user.dto";
import { UserRepository } from "../repository/user.repository";
import { MailService } from "./mail.service";
import { TokenService } from "./token.service";
import * as bcrypt from "bcrypt";
import * as uuid from "uuid";

export class UserService {
  async registration(email: string, password: string) {
    const mailService = new MailService();
    const tokenService = new TokenService();
    // checking we not have any user with similar email
    const candidate = await UserRepository.findOneBy({
      email,
    });
    if (candidate) {
      throw new Error("User already exist!");
    }
    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = uuid.v4();
    const user = await UserRepository.save({
      id: uuid.v4(),
      email,
      password: hashPassword,
      activationLink,
    });

    await mailService.sendActivationMail(email, activationLink);
    const userDto = new UserDTO(user); // id, email, isActivated
    const tokens = await tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }
}
