import {Controller, Param} from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {ManifestationService} from "./manifestation.service";
import {Manifestation} from "./manifestation.entity";
import {CreateManifestationDto} from "./dto/create-manifestation.dto";
import {UpdateManifestationDto} from "./dto/update-manifestation.dto";

/**
 * Controller for managing manifestations.
 */
@Controller('manifestation')
export class ManifestationController {
  constructor(private readonly manifestationService: ManifestationService) {}

    /**
   * Retrieves all manifestations.
   * @returns {Promise<Manifestation[]>} List of manifestations.
   */
  @MessagePattern('findAll')
  async findAll() {
    return this.manifestationService.findAll();
  }

    /**
   * Retrieves a manifestation by its ID.
   * @param {string} id - The ID of the manifestation.
   * @returns {Promise<Manifestation>} The found manifestation.
   */
  @MessagePattern('findOne')
  async findOne(@Payload() id: string): Promise<Manifestation> {
    return await this.manifestationService.findOne(id);
  }

    /**
   * Retrieves manifestations where the user is a participant.
   * @param {string} sub - The user's ID or identifier.
   * @returns {Promise<Manifestation[]>} List of manifestations.
   */
  @MessagePattern('findMyManifestations')
  async findMyManifestations(@Payload() sub: string): Promise<Manifestation[]> {
    return this.manifestationService.findMyManifestations(sub);
  }

    /**
   * Creates a new manifestation.
   * @param {CreateManifestationDto} createManifestationDto - The data for creating a manifestation.
   * @returns {Promise<Manifestation>} The created manifestation.
   */
  @MessagePattern('create')
  async create(@Payload() createManifestationDto: CreateManifestationDto): Promise<Manifestation> {
    return this.manifestationService.create(createManifestationDto);
  }

    /**
   * Updates a manifestation by its ID.
   * @param {string} id - The ID of the manifestation.
   * @param {UpdateManifestationDto} updateManifestationDto - The data for updating the manifestation.
   * @returns {Promise<Manifestation>} The updated manifestation.
   */
  @MessagePattern('update')
  async update(@Payload() { id, updateManifestationDto, sub }: { id: string, updateManifestationDto: UpdateManifestationDto, sub: string }): Promise<Manifestation> {
    return this.manifestationService.update(id, updateManifestationDto, sub);
  }

    /**
   * Joins a user to a manifestation.
   * @param {{ id: string, participantId: string }} payload - The ID of the manifestation and the participant's ID.
   * @returns {Promise<Manifestation>} The updated manifestation.
   */
  @MessagePattern('joinManifestation')
  async joinManifestation(@Payload() { id, participantId }: { id: string, participantId: string }): Promise<Manifestation> {
    return this.manifestationService.joinManifestation(id, participantId);
  }

    /**
   * Removes a user from a manifestation.
   * @param {{ id: string, participantId: string }} payload - The ID of the manifestation and the participant's ID.
   * @returns {Promise<Manifestation>} The updated manifestation.
   */
  @MessagePattern('leftManifestation')
  async leftManifestation(@Payload() { id, participantId }: { id: string, participantId: string }): Promise<Manifestation> {
    return this.manifestationService.leftManifestation(id, participantId);
  }

  /**
   * Deletes a manifestation by its ID.
   * @param {string} id - The ID of the manifestation.
   * @returns {Promise<void>}
   */
  @MessagePattern('deleteManifestation')
  async remove(@Payload() { id, sub }: { id: string, sub: string }): Promise<Manifestation> {
    return this.manifestationService.deleteManifestation(id, sub);
  }
}
