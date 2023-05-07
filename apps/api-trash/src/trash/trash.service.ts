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

    findAll( data : any ) {
        console.log('api-trash', data);
        return { message: 'Welcome to api-trash!' };
    }

    async create( createTrashDto: CreateTrashDto ): Promise<Trash> {
        const trash = new Trash();
        trash.reference = createTrashDto.reference;
        trash.description = createTrashDto.description;
        return this.trashRepository.save(trash);
    }

    async update(id: string, updateTrashDto: UpdateTrashDto): Promise<Trash> {
        const trash = await this.trashRepository.findOneBy({ id });
        trash.description = updateTrashDto.description;
        trash.isBurned = updateTrashDto.isBurned;
        trash.isActive = updateTrashDto.isActive;
        return this.trashRepository.save(trash);
    }
}
