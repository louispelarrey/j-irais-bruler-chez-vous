import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Manifestation {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column({ default: true})
    isActive: boolean;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    date_debut: Date;

    // @Column()
    // participants: Array<CreateUserDto>;
}
