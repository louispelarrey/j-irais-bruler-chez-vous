
import { Entity, PrimaryGeneratedColumn, ManyToOne, Generated } from "typeorm";
import { Users } from "../user/users.entity";

@Entity()
export class ForgotPassword {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Users, users => users.forgotPassword)
  user: Users;

  @Generated('uuid')
  token: string;
}
