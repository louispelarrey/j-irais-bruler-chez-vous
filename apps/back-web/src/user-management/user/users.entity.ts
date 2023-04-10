import { Exclude } from "class-transformer";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { Role } from "../role/enums/role.enum";

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
}
