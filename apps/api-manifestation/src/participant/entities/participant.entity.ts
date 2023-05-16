import {Column, PrimaryGeneratedColumn} from "typeorm";

export class Participant {
  @PrimaryGeneratedColumn("uuid")
  @Column()
  id: string;


}


