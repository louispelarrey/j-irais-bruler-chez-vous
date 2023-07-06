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

  /**
   * Get all trash.
   * @returns An array of trash.
   */
  async findAll() {
    return this.trashClient.send('findAll', {});
  }

  async getHeatmapData(startDate: string) {
    return this.trashClient.send('getHeatmapData', { startDate });
  }

  /**
   * Get all trash posted by a user.
   * @param posterId - The ID of the user who posted the trash.
   * @returns An array of trash posted by the user.
   */
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

  /**
   * Get a specific trash by its ID.
   * @param id - The ID of the trash.
   * @returns The trash object.
   */
  async findOne(id: string) {
    return this.trashClient.send('findOne', id);
  }

  /**
   * Create a new trash.
   * @param sub - The ID of the user who is creating the trash.
   * @param createTrashDto - The DTO containing the data for creating the trash.
   * @param file - The uploaded file (trash image).
   * @returns The created trash object.
   */
  async create(sub: string, createTrashDto: TrashDto, file: Express.Multer.File) {
    return await lastValueFrom(
      this.trashClient.send('create', {
        file,
        data: {
          reference: createTrashDto.data.reference,
          description: createTrashDto.data.description,
          latitude: createTrashDto.data.latitude,
          longitude: createTrashDto.data.longitude,
          address: createTrashDto.data.address,
          posterId: sub,
        },
      })
    );
  }


  /**
   * Update a trash.
   * @param id - The ID of the trash to update.
   * @param updateTrashDto - The DTO containing the updated data for the trash.
   * @returns The updated trash object.
   */
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

  /**
   * Take a contract for a trash item.
   * @param id - The ID of the trash item to take the contract for.
   * @param sub - The ID of the user taking the contract.
   * @returns The updated trash item object with the contract taken.
   */
  async takeContract(id: string, sub: string) {
    return await lastValueFrom(
      this.trashClient.send('takeContract', {
        id,
        burnerId: sub,
      })
    );
  }

  /**
   * Remove a trash item.
   * @param id - The ID of the trash item to remove.
   * @param sub - The ID of the user removing the trash item.
   * @returns The removed trash item object.
   */
  async remove(id: string, sub: string) {
    return await lastValueFrom(
      this.trashClient.send('remove', {
        id,
        burnerId: sub,
      })
    );
  }

  /**
   * Remove a burner from a trash item.
   * @param id - The ID of the trash item to remove the burner from.
   * @param sub - The ID of the user removing the burner from the trash item.
   * @returns The updated trash item object with the burner removed.
   */
  async removeBurner(id: string, sub: string) {
    return await lastValueFrom(
      this.trashClient.send('removeBurner', {
        id,
        burnerId: sub,
      })
    );
  }

  async endContract(id: string, sub: string) {
    return await lastValueFrom(
      this.trashClient.send('endContract', {
        id,
        burnerId: sub,
      })
    );
  }


  async getPaginatedTrash(page: number, limit: number) {
    return await lastValueFrom(
      this.trashClient.send('getPaginatedTrashs', {
        page,
        limit,
      })
    );
  }
}
