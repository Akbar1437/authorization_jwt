import * as jwt from "jsonwebtoken";
import * as uuid from "uuid";
import { TokenRepository } from "../repository";

export class TokenService {
  async generateTokens(payload: {
    id: string;
    isActivated: boolean;
    email: string;
  }) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET!, {
      expiresIn: "30m",
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET!, {
      expiresIn: "30d",
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async saveToken(userId: string, refreshToken: string) {
    const tokenData = await TokenRepository.findOne({
      where: { userId },
    });
    console.log("token data", tokenData);

    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return await TokenRepository.save(tokenData);
    }
    const token = await TokenRepository.save({
      id: uuid.v4(),
      refreshToken,
      userId,
    });
    return token;
  }
}
