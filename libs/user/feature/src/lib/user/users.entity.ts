import { Role } from "@j-irais-bruler-chez-vous/shared";
import { Exclude } from "class-transformer";
import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToMany } from "typeorm";
import { ForgotPassword } from "../forgot-password/forgot-password.entity";

@Entity()
export class Users {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column('jsonb', {default: ['USER']})
  roles: Role[];

  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;

  @OneToMany(() => ForgotPassword, forgotPassword => forgotPassword.user)
  forgotPassword: ForgotPassword[];
}
