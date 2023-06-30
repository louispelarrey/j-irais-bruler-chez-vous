import { UpdateUserDto } from '@j-irais-bruler-chez-vous/user/feature';
import { TrashDto } from './dto/trash.dto';
import { UpdateTrashDto } from './dto/updateTrashDto.dto';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { MessageDto } from '@j-irais-bruler-chez-vous/message/feature';

@Injectable()
export class AdminService {

    constructor(
        @Inject('TRASH') private readonly trashClient: ClientProxy,
        @Inject('USER') private readonly userClient: ClientProxy,
        @Inject('MANIFESTATION') private readonly manifestationClient: ClientProxy,
        @Inject('MESSAGE') private readonly messageClient: ClientProxy
    ) {}

    async findAllTrash() {
        return this.trashClient.send('findAll', {});
    }

    async updateTrash(id: string, updateTrashDto: UpdateTrashDto) {
        console.log('gate service', updateTrashDto);
        return this.trashClient.send('update', {id, updateTrashDto});
    }

    async findAllUser() {
        return this.userClient.send('findAllUsers', {});
    }

    async findAllManifestation() {
        return this.manifestationClient.send('findAll', {});
    }

    async findAllMessage() {
        return this.messageClient.send('findAll', {});
    }

    async updateMessage(id: string, messageDto: MessageDto) {
        return this.messageClient.send('update', {id, messageDto});
    }

    async removeMessage(id: string) {
        return this.messageClient.send('remove', id);
    }
}

