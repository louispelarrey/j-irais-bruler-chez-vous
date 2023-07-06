import {Inject, Injectable} from "@nestjs/common";
import { ClientProxy } from '@nestjs/microservices';
import {CreateManifestationDto} from "./dto/create-manifestation.dto";
import {UpdateManifestationDto} from "./dto/update-manifestation";
import { lastValueFrom } from "rxjs";


@Injectable()
export class ManifestationService {
  constructor(
    @Inject('MANIFESTATION') private readonly manifestationClient: ClientProxy,
    @Inject('USER') private readonly userClient: ClientProxy,
  ){}

  /**
   * Get all manifestations.
   * @returns An array of manifestations.
   */
  async findAll() {
    return this.manifestationClient.send('findAll', {});
  }

  /**
   * Get a specific manifestation by its ID.
   * @param id - The ID of the manifestation.
   * @returns The manifestation object.
   */
  async findOne(id: string) {
    return this.manifestationClient.send('findOne', id);
  }

  /**
   * Find manifestations created by the specified user.
   * @param sub - The ID of the user.
   * @returns An array of manifestations created by the user.
   */
  async findMyManifestations(sub: string) {
    return await lastValueFrom(
      this.manifestationClient.send('findMyManifestations', sub)
    );
  }

  /**
   * Create a new manifestation.
   * @param createManifestationDto - The data for creating the manifestation.
   * @param sub - The ID of the creator.
   * @returns The created manifestation object.
   */
  async create(createManifestationDto: CreateManifestationDto, sub:string) {
    return this.manifestationClient.send('create', {
      description: createManifestationDto.description,
      title: createManifestationDto.title,
      address: createManifestationDto.address,
      start_date: createManifestationDto.start_date,
      creatorId: sub,
    });
  }

  /**
   * Update a manifestation.
   * @param id - The ID of the manifestation to update.
   * @param updateManifestationDto - The updated data for the manifestation.
   * @returns The updated manifestation object.
   */
  async update(id: string, updateManifestationDto: UpdateManifestationDto, sub: string) {
    return this.manifestationClient.send('update', { id, updateManifestationDto, sub });
  }

  /**
   * Join a manifestation as a participant.
   * @param id - The ID of the manifestation to join.
   * @param sub - The ID of the participant.
   * @returns The updated manifestation object with the participant added.
   */
  async joinManifestation(id: string,  sub: string) {
    return await lastValueFrom(
      this.manifestationClient.send('joinManifestation', {
        id,
        participantId: sub,
      })
    );
  }

  /**
   * Leave a manifestation as a participant.
   * @param id - The ID of the manifestation to leave.
   * @param sub - The ID of the participant.
   * @returns The updated manifestation object with the participant removed.
   */
  async leftManifestation(id: string, sub: string) {
    return await lastValueFrom(
      this.manifestationClient.send('leftManifestation', {
        id,
        participantId: sub,
      })
    );
  }

  /**
   * Delete a manifestation.
   * @param id - The ID of the manifestation to delete.
   * @param sub - The ID of the creator.
   * @returns The deleted manifestation object.
   */
  async deleteManifestation(id: string, sub: string) {
    return this.manifestationClient.send('deleteManifestation', { id, sub });
  }
}
