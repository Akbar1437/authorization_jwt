import { UserDTO } from "../dtos/user.dto";
import { UserRepository } from "../repository/user.repository";
import { MailService } from "./mail.service";
import { tokenService } from "./token.service";
import * as bcrypt from "bcrypt";
import * as uuid from "uuid";

class UserService {
  async registration(email: string, password: string) {
    const mailService = new MailService();
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

    await mailService.sendActivationMail(
      email,
      `${process.env.API_URL}/api/activate/${activationLink}`
    );
    const userDto = new UserDTO(user); // id, email, isActivated
    const tokens = await tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async activate(activationLink: string) {
    const user = await UserRepository.findOneBy({ activationLink });
    if (!user) {
      throw new Error("Invalid link for activation");
    }
    user.isActivated = true;
    await UserRepository.save(user);
  }

  async login(email: string, password: string) {
    const user = await UserRepository.findOneBy({ email });
    if (!user) {
      throw new Error(`User with ${email} email not found`);
    }
    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw new Error("Incorrect password");
    }

    const userDto = new UserDTO(user);
    const tokens = await tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async logout(refreshToken: string) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }
}

export const userService = new UserService();
