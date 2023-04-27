import { Role } from "@j-irais-bruler-chez-vous/shared";
import { Exclude } from "class-transformer";
import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToMany } from "typeorm";

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

  // @OneToMany(() => Message, (message) => message.sender)
  // messages: Message[];

  // @OneToMany(() => Trashs, trash => trash.user)
  // @JoinColumn()
  // trashs: Trashs[];
}
