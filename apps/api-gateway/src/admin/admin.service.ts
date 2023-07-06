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

    /**
   * Retrieves all the trashes.
   * @returns A promise that resolves to the trashes.
   */
    async findAllTrash() {
        return this.trashClient.send('findAll', {});
    }

    /**
   * Retrieves all the trashes.
   * @returns A promise that resolves to the trashes.
   */
    async updateTrash(id: string, updateTrashDto: UpdateTrashDto) {
        return this.trashClient.send('update', {id, updateTrashDto});
    }

    /**
   * Retrieves all the users.
   * @returns A promise that resolves to the users.
   */
    async findAllUser() {
        return this.userClient.send('findAllUsers', {});
    }

    /**
   * Retrieves all the manifestations.
   * @returns A promise that resolves to the manifestations.
   */
    async findAllManifestation() {
        return this.manifestationClient.send('findAll', {});
    }

    /**
   * Retrieves all the messages.
   * @returns A promise that resolves to the messages.
   */
    async findAllMessage() {
        return this.messageClient.send('findAll', {});
    }

    /**
   * Updates a message.
   * @param id - The ID of the message.
   * @param messageDto - The update data for the message.
   * @returns A promise that resolves to the updated message.
   */
    async updateMessage(id: string, messageDto: MessageDto) {
        return this.messageClient.send('update', {id, messageDto});
    }

    /**
   * Removes a message.
   * @param id - The ID of the message to remove.
   * @returns A promise that resolves to the deleted message.
   */
    async removeMessage(id: string) {
        return this.messageClient.send('remove', id);
    }
}

