import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Users } from '../../user-management/user/users.entity';

@Entity()
export class Trashs {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    name: string;
    
    @Column()
    description: string;

    @Column({ default: false})
    isBurned: boolean;

    @Column({ default: true})
    isActive: boolean;

    @ManyToOne(() => Users, user => user.trashs)
    user: Users;
    
}