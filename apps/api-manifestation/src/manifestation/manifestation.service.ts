import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import { Repository, In, Raw } from "typeorm";
import {Manifestation} from "./manifestation.entity";
import {CreateManifestationDto} from "./dto/create-manifestation.dto";
import {UpdateManifestationDto} from "./dto/update-manifestation.dto";

@Injectable()
export class ManifestationService {

  constructor(
    @InjectRepository(Manifestation)
    private readonly manifestationRepository: Repository<Manifestation>,
  ) {}

  async findAll() {
    return this.manifestationRepository.find();
  }

  async findOne(id: string) {
    const manifestation = await this.manifestationRepository.findOne({ where: { id } });
    return manifestation;
  }

  async findMyManifestations(sub: string) {
    const allManifestations = await this.manifestationRepository.find();

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

  async create( createManifestationDto: CreateManifestationDto ): Promise<Manifestation> {
    const manifestation = new Manifestation();
    manifestation.title = createManifestationDto.title;
    manifestation.description = createManifestationDto.description;
    manifestation.creatorId = createManifestationDto.creatorId;
    manifestation.address = createManifestationDto.address;
    return this.manifestationRepository.save(manifestation);
  }

  async update(id: string, updateManifestationDto: UpdateManifestationDto): Promise<Manifestation> {
    const manifestation = await this.manifestationRepository.findOne({where: {id}});
    manifestation.title = updateManifestationDto.title;
    manifestation.description = updateManifestationDto.description;
    return this.manifestationRepository.save(manifestation);
  }

  async joinManifestation(id: string, participantId: string): Promise<Manifestation> {
    const manifestation = await this.manifestationRepository.findOne({where: {id}, relations: ['participants']});

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
}
