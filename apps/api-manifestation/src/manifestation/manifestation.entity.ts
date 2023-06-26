import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Participant } from '../participant/participant.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Manifestation {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    title: string;

    @Column()
    ville: string;

    @Column()
    description: string;

    @Column({ default: true})
    isActive: boolean;

    @Column()
    creatorId: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    start_date: Date;

    @OneToMany(() => Participant, (participant) => participant.manifestation)
    participants: Participant[];
}
