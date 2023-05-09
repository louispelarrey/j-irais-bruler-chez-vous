import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Trash {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    
    @Column()
    reference: string;
    
    @Column()
    description: string;

    @Column({ default: false})
    isBurned: boolean;

    @Column({ default: true})
    isActive: boolean;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    updatedAt: Date;
}