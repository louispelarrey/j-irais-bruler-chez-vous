import { UpdateUserDto } from '@j-irais-bruler-chez-vous/user/feature';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

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

    async findAllUser() {
        return this.userClient.send('findAllUsers', {});
    }

    async updateUser(id: string, updateUserDto: UpdateUserDto) {
        return this.userClient.send('updateUser', { id, updateUserDto });
    }

    async findAllManifestation() {
        return this.manifestationClient.send('findAll', {});
    }
}

