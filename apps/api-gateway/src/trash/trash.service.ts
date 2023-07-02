import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { TrashDto } from './dto/trash.dto';
import { lastValueFrom } from 'rxjs';
import { Express } from 'express';
import { Multer } from 'multer';
import { UpdateTrashDto } from './dto/updateTrash.dto';

@Injectable()
export class TrashService {

  constructor(
    @Inject('TRASH') private readonly trashClient: ClientProxy,
    @Inject('USER') private readonly userClient: ClientProxy
  ) {}

  async findAll() {
    return this.trashClient.send('findAll', {});
  }

  async findAllByUser(posterId: string) {
    const trashes = await lastValueFrom(
      this.trashClient.send('findAllByUser', posterId)
    );
    const updatedTrashes = await Promise.all(
      trashes.map(async (trash) => {
        trash.poster = await lastValueFrom(
          this.userClient.send('findUserById', trash.posterId)
        );
        return trash;
      })
    );
    return updatedTrashes;
  }

  async findOne(id: string) {
    return this.trashClient.send('findOne', id);
  }

  async create(sub: string, createTrashDto: TrashDto, file: Express.Multer.File) {
    return await lastValueFrom(
      this.trashClient.send('create', {
        file,
        data: {
          reference: createTrashDto.data.reference,
          description: createTrashDto.data.description,
          address: createTrashDto.data.address,
          posterId: sub,
        },
      })
    );
  }

  async update(id: string, updateTrashDto: UpdateTrashDto) {
    return await lastValueFrom(
      this.trashClient.send('update', {
        id,
        data: {
          reference: updateTrashDto.data.reference,
          description: updateTrashDto.data.description,
        },
      })
    );
  }

  async takeContract(id: string, sub: string) {
    return await lastValueFrom(
      this.trashClient.send('takeContract', {
        id,
        burnerId: sub,
      })
    );
  }

  async remove(id: string, sub: string) {
    return await lastValueFrom(
      this.trashClient.send('remove', {
        id,
        burnerId: sub,
      })
    );
  }

  async removeBurner(id: string, sub: string) {
    return await lastValueFrom(
      this.trashClient.send('removeBurner', {
        id,
        burnerId: sub,
      })
    );
  }
}
