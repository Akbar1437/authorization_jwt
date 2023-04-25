import * as jwt from "jsonwebtoken";
import * as uuid from "uuid";
import { TokenRepository } from "../repository";

type PayloadType = {
  id: string;
  isActivated: boolean;
  email: string;
};

class TokenService {
  async generateTokens(payload: PayloadType) {
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

  validateAccessToken(token: string) {
    try {
      const user = jwt.verify(
        token,
        process.env.JWT_ACCESS_SECRET!
      ) as PayloadType;
      return user;
    } catch (error) {
      return null;
    }
  }
  validateRefreshToken(token: string) {
    try {
      return jwt.verify(token, process.env.JWT_REFRESH_SECRET!) as PayloadType;
    } catch (error) {
      return null;
    }
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

  async removeToken(refreshToken: string) {
    const token = await TokenRepository.findOneBy({ refreshToken });
    if (!token) {
      throw Error("Token is not defined");
    }
    await TokenRepository.delete(token.id);
    return true;
  }

  async findToken(refreshToken: string) {
    return await TokenRepository.findOneBy({ refreshToken });
  }
}
export const tokenService = new TokenService();
