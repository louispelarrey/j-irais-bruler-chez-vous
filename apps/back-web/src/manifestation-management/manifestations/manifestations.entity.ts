import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Users } from '@user-management/user/users.entity';

@Entity()
export class Manifestations {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column({ default: false})
    chat: boolean;

    @Column({ default: new Date()})
    heure_debut: Date;

    @Column({ default: true})
    isActive: boolean;

    @OneToMany(() => Users, user => user.manifestations)
    user: Users;

}
