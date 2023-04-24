import { AppDataSource } from "../app/data-source";
import { TokenEntity } from "../entity";

export const TokenRepository = AppDataSource.getRepository(TokenEntity).extend(
  {}
);
