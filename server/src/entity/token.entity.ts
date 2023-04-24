import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { TokenModel } from "../model";
import { UserEntity } from "./user.entity";

@Entity("token")
export class TokenEntity implements TokenModel {
  @PrimaryColumn({ type: "varchar" })
  id!: string;

  @Column({ type: "varchar" })
  refreshToken!: string;

  @Column({ type: "varchar" })
  userId!: string;

  @OneToOne(() => UserEntity, (user) => user.token) // specify inverse side as a second parameter
  @JoinColumn()
  user!: UserEntity;
}
