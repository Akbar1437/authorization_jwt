import { AppDataSource } from "../app/data-source"
import { UserEntity } from "../entity"

export const UserRepository = AppDataSource.getRepository(UserEntity).extend({})
