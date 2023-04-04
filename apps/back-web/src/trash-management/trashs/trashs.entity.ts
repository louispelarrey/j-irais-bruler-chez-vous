import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Trashs {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    name: string;
    
    @Column()
    description: string;

    @Column()
    status: string;
}