import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Manifestation} from "./manifestation.entity";
import {CreateManifestationDto} from "./dto/create-manifestation.dto";
import {UpdateManifestationDto} from "./dto/update-manifestation.dto";
import { Participant } from '../participant/participant.entity';
import { last } from 'rxjs';

@Injectable()
export class ManifestationService {

  constructor(
    @InjectRepository(Manifestation)
    private readonly manifestationRepository: Repository<Manifestation>,
    @InjectRepository(Participant)
    private readonly participantRepository: Repository<Participant>
  ) {}

  async findAll() {
    return this.manifestationRepository.find();
  }

  async findOne(id: string) {
    const manifestation = await this.manifestationRepository.findOne({ where: { id } });
    return manifestation;
  }

  async findMyManifestations(sub: string) {
    console.log("Manif service");
    const manifestations = await this.manifestationRepository.find({ where: { participants: { participantId: sub } } });
    return manifestations;
  }

  async create( createManifestationDto: CreateManifestationDto ): Promise<Manifestation> {
    const manifestation = new Manifestation();
    manifestation.title = createManifestationDto.title;
    manifestation.description = createManifestationDto.description;
    manifestation.creatorId = createManifestationDto.creatorId;
    manifestation.ville = createManifestationDto.ville;
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

    const participantAlreadyInManifestation = manifestation.participants.find(participant => participant.participantId === participantId);
    if (participantAlreadyInManifestation) {
      throw new HttpException(
        'Vous participez déjà à cette manifestation',
        HttpStatus.BAD_REQUEST
      );
    }

    const participant = new Participant();
    participant.participantId = participantId;
    await this.participantRepository.save(participant);

    const newParticipant = await this.participantRepository.findOne({where: {participantId}});
    manifestation.participants.push(newParticipant);
    return this.manifestationRepository.save(manifestation);
  }
}
