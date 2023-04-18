import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Trashs } from './trashs.entity';
import { CreateTrashDto } from './dto/create-trash.dto';
import { UpdateTrashDto } from './dto/update-trash.dto';
import { Users } from '../../user-management/user/users.entity';

interface UserJWT {
    sub: number;

    username: string

    roles: string[]
}

@Injectable()
export class TrashsService {

    constructor(
        @InjectRepository(Trashs)
        private readonly trashRepository: Repository<Trashs>,

        @InjectRepository(Users)
        private readonly usersRepository: Repository<Users>
    ) { }

    /**
     * Find all trashs
     * @returns {Promise<Trash>} List of trashs
     */
    async findAll(): Promise<Trashs[]> {
        return await this.trashRepository.find();
    }

    /**
     * Find a specific trash by his ID
     * @param id
     * @returns {Promise<Trash>} Found trash
    */
    async findOne(id: number): Promise<Trashs> {
        const trash = await this.trashRepository.findOneBy({ id });
        return trash;
    }

    /**
     * Create a new trash
     * @param {CreateTrashDto} createTrashDto
     * @returns {Promise<Trash>} Created trash
    */
    async createTrash(createTrashDto: CreateTrashDto, userJwt: UserJWT): Promise<Trashs> {
        const trash = new Trashs();
        trash.name = createTrashDto.name;
        trash.description = createTrashDto.description;
        const userEntity = await this.usersRepository.findOneBy({ id: userJwt.sub });
        trash.user = userEntity
        return this.trashRepository.save(trash);
    }

    /**
     * Update a specific trash
     * @param {number} id
     * @param {UpdateTrashDto} updateTrashDto
     * @returns {Promise<Trash>} Updated trash
    */
    async updateTrash(id: number, updateTrashDto: UpdateTrashDto): Promise<Trashs> {
        const user = await this.trashRepository.findOneBy({ id });
        user.name = updateTrashDto.name;
        user.description = updateTrashDto.description;
        return this.trashRepository.save(user);
    }
}
