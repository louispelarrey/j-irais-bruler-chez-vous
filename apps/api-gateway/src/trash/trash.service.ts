import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateTrashDto } from './dto/create-trash.dto';
import { UpdateTrashDto } from './dto/update-trash.dto';

@Injectable()
export class TrashService {
    constructor(
        @Inject('TRASH') private readonly trashClient: ClientProxy,
        @Inject('USER') private readonly userClient: ClientProxy,
    ){}

    async findAll() {
        return this.trashClient.send('findAll', {});
    }

    async findOne(id: string) {
        return this.trashClient.send('findOne', { id });
    }

    async create(createTrashDto: CreateTrashDto) {
        return this.trashClient.send('create', createTrashDto);
    }

    async update(id: string, updateTrashDto: UpdateTrashDto) {
        return this.trashClient.send('update', { id, updateTrashDto });
    }
}
