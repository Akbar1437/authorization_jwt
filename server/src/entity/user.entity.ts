import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { UserModel } from "../model";
import { TokenEntity } from "./token.entity";

@Entity("user")
export class UserEntity implements UserModel {
  @PrimaryColumn({ type: "varchar" })
  id!: string;

  @Column({ type: "varchar" })
  email!: string;

  @Column({ type: "varchar" })
  password!: string;

  @Column({ type: "boolean", default: false })
  isActivated!: boolean;

  @Column({ type: "varchar", nullable: true })
  activationLink!: string;

  @OneToOne(() => TokenEntity, (token) => token.user) // specify inverse side as a second parameter
  token!: TokenEntity;
}
