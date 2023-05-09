import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Trash } from './trash.entity';
import { CreateTrashDto } from './dto/create-trash.dto';
import { UpdateTrashDto } from './dto/update-trash.dto';

@Injectable()
export class TrashService {

    constructor(
        @InjectRepository(Trash)
        private readonly trashRepository: Repository<Trash>
    ) {}

    findAll() {
        const trashs = this.trashRepository.find();
        return trashs;
    }

    async findOne(id: string) {
        const trash = await this.trashRepository.findOne({where: {id}});
        console.log('service :', id);
        return trash;
    }

    async create( createTrashDto: CreateTrashDto ): Promise<Trash> {
        const trash = new Trash();
        trash.reference = createTrashDto.reference;
        trash.description = createTrashDto.description;
        return this.trashRepository.save(trash);
    }

    async update(id: string, updateTrashDto: UpdateTrashDto): Promise<Trash> {
        const trash = await this.trashRepository.findOne({where: {id}});
        trash.description = updateTrashDto.description;
        trash.isBurned = updateTrashDto.isBurned;
        trash.isActive = updateTrashDto.isActive;
        return this.trashRepository.save(trash);
    }
}
