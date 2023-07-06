import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Users } from '../user/users.entity';

@Entity()
export class UserTrash {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column()
    userId: string;
    
    @Column()
    trashId: string;
    
    @ManyToOne(() => Users, (users) => users.userTrash)
    user: Users;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    updatedAt: Date;
}

