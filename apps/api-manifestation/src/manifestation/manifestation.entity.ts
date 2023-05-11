import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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

    // @Column()
    // participants: Array<CreateUserDto>;
}
