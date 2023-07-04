import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import { Repository, In, Raw } from "typeorm";
import {Manifestation} from "./manifestation.entity";
import {CreateManifestationDto} from "./dto/create-manifestation.dto";
import {UpdateManifestationDto} from "./dto/update-manifestation.dto";
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class ManifestationService {

  constructor(
    @InjectRepository(Manifestation)
    private readonly manifestationRepository: Repository<Manifestation>,
  ) {}

    /**
   * Retrieve all manifestations.
   * @returns {Promise<Manifestation[]>} A promise that resolves to an array of manifestations.
   */
  async findAll() {
    const manifestations = await this.manifestationRepository.find({where: {isActive: true}});
    return manifestations;
  }

    /**
   * Find a manifestation by ID.
   * @param {string} id - The ID of the manifestation to find.
   * @returns {Promise<Manifestation>} A promise that resolves to the found manifestation, or undefined if not found.
   */
  async findOne(id: string) {
    const manifestation = await this.manifestationRepository.findOne({ where: { id } });
    return manifestation;
  }

    /**
   * Find manifestations in which the specified user is a participant or creator.
   * @param {string} sub - The ID of the user.
   * @returns {Promise<Manifestation[]>} A promise that resolves to an array of manifestations.
   */
  async findMyManifestations(sub: string) {
    const allManifestations = await this.manifestationRepository.find({where: {isActive: true}});

    const manifestations = allManifestations.filter((manifestation) => {
      if(manifestation.creatorId === sub) {
        return true;
      }

      if(manifestation.participants.includes(sub)) {
        return true;
      }

      return false;
    });

    return manifestations;
  }

    /**
   * Create a new manifestation.
   * @param {CreateManifestationDto} createManifestationDto - The DTO containing manifestation data.
   * @returns {Promise<Manifestation>} A promise that resolves to the created manifestation.
   */
  async create( createManifestationDto: CreateManifestationDto ): Promise<Manifestation> {
    const manifestation = new Manifestation();
    manifestation.title = createManifestationDto.title;
    manifestation.description = createManifestationDto.description;
    manifestation.creatorId = createManifestationDto.creatorId;
    manifestation.address = createManifestationDto.address;
    manifestation.start_date = new Date(createManifestationDto.start_date);
    return this.manifestationRepository.save(manifestation);
  }

    /**
   * Update a manifestation by ID.
   * @param {string} id - The ID of the manifestation to update.
   * @param {UpdateManifestationDto} updateManifestationDto - The DTO containing updated manifestation data.
   * @returns {Promise<Manifestation>} A promise that resolves to the updated manifestation.
   */
  async update(id: string, updateManifestationDto: UpdateManifestationDto, sub:string): Promise<Manifestation> {
    const manifestation = await this.manifestationRepository.findOne({ where: { id } });
    if(!manifestation) {
      throw new HttpException(
        'Manifestation non trouvée',
        HttpStatus.NOT_FOUND
      );
    }

    if(manifestation.creatorId !== sub) {
      throw new HttpException(
        'Vous n\'êtes pas le créateur de cette manifestation',
        HttpStatus.FORBIDDEN
      );
    }

    manifestation.title = updateManifestationDto.title;
    manifestation.description = updateManifestationDto.description;
    manifestation.address = updateManifestationDto.address;
    manifestation.start_date = new Date(updateManifestationDto.start_date);
    return this.manifestationRepository.save(manifestation);
  }

    /**
   * Add a participant to a manifestation.
   * @param {string} id - The ID of the manifestation.
   * @param {string} participantId - The ID of the participant to add.
   * @returns {Promise<Manifestation>} A promise that resolves to the updated manifestation.
   * @throws {HttpException} If the participant is the creator or has already joined the manifestation.
   */
  async joinManifestation(id: string, participantId: string): Promise<Manifestation> {
    const manifestation = await this.manifestationRepository.findOne({where: {id}});

    if(!manifestation) {
      throw new HttpException(
        'Manifestation non trouvée',
        HttpStatus.NOT_FOUND
      );
    }

    if (manifestation.creatorId === participantId) {
      throw new HttpException(
        'Vous ne pouvez pas rejoindre votre propre manifestation',
        HttpStatus.BAD_REQUEST
      );
    }
    if(manifestation.participants.includes(participantId)) {
      throw new HttpException(
        'Vous avez déjà rejoint cette manifestation',
        HttpStatus.BAD_REQUEST
      );
    }
    manifestation.participants.push(participantId);
    return this.manifestationRepository.save(manifestation);
  }

    /**
   * Remove a participant from a manifestation.
   * @param {string} id - The ID of the manifestation.
   * @param {string} participantId - The ID of the participant to remove.
   * @returns {Promise<Manifestation>} A promise that resolves to the updated manifestation.
   * @throws {HttpException} If the participant is the creator or has not joined the manifestation.
   */
  async leftManifestation(id: string, participantId: string): Promise<Manifestation> {
    const manifestation = await this.manifestationRepository.findOne({where: {id}});
    if(manifestation.creatorId === participantId) {
      throw new HttpException(
        'Vous ne pouvez pas quitter votre propre manifestation',
        HttpStatus.BAD_REQUEST
      );
    }
    if(!manifestation.participants.includes(participantId)) {
      throw new HttpException(
        'Vous n\'avez pas rejoint cette manifestation',
        HttpStatus.BAD_REQUEST
      );
    }
    manifestation.participants = manifestation.participants.filter((participant) => participant !== participantId);
    return this.manifestationRepository.save(manifestation);
  }

  @Cron(CronExpression.EVERY_10_MINUTES)
  async updateOldManifestations() {
    const manifestations = await this.manifestationRepository.find({
      where: {
        start_date: Raw(alias => `${alias} < NOW()`)
      }
    });
    manifestations.forEach((manifestation) => {
      manifestation.isActive = false;
    });
    await this.manifestationRepository.save(manifestations);
  }
}
