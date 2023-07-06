import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Users } from '../user/users.entity';

@Entity()
export class UserManifestation {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column()
    userId: string;
    
    @Column()
    manifestationId: string;
    
    @ManyToOne(() => Users, (users) => users.userManifestation)
    user: Users;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    updatedAt: Date;
}