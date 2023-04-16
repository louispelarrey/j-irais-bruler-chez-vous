import { Exclude } from "class-transformer";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Role } from "../role/enums/role.enum";
import { Message } from "@messaging/message/entities/message.entity";

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
}
