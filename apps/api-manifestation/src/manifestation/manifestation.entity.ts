import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Manifestation {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    title: string;

    @Column()
    address: string;

    @Column()
    description: string;

    @Column({ default: true})
    isActive: boolean;

    @Column()
    creatorId: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    start_date: Date;

    @Column('jsonb', {default: []})
    participants: string[];

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
}
