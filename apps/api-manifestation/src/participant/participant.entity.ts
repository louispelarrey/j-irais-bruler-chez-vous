import {Column, PrimaryGeneratedColumn, ManyToMany, Entity, ManyToOne} from "typeorm";
import { Manifestation } from "../manifestation/manifestation.entity";
import { Exclude } from "class-transformer";

@Entity()
export class Participant {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  participantId: string;

  @ManyToOne(() => Manifestation, (manifestation) => manifestation.participants)
  manifestation: Manifestation;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updatedAt: Date;
}


