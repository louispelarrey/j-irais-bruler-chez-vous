import { Users } from "@user-management/user/users.entity";
import { Room } from "../../room/entities/room.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Message {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  message: string;

  @ManyToOne(() => Users, (users) => users.messages)
  sender: Users;

  @ManyToOne(() => Room, (room) => room.messages)
  room: Room;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updatedAt: Date;
}
