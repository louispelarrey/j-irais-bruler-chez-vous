import { Exclude } from "class-transformer";
import { Message } from "@messaging/message/entities/message.entity";
import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToMany } from "typeorm";
import { Role } from "../role/enums/role.enum";
import { Trashs } from "../../trash-management/trashs/trashs.entity";

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

  @OneToMany(() => Message, (message) => message.sender)
  messages: Message[];

  @OneToMany(() => Trashs, trash => trash.user)
  @JoinColumn()
  trashs: Trashs[];
}
