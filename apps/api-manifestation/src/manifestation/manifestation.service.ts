import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Manifestation} from "./manifestation.entity";
import {CreateManifestationDto} from "./dto/create-manifestation.dto";
import {UpdateManifestationDto} from "./dto/update-manifestation.dto";
import { Participant } from '../participant/participant.entity';

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
    const manifestation = await this.manifestationRepository.findOne({where: {id}});
    console.log('service :', id);
    return manifestation;
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

  async joinManifestation(id: string, sub: string): Promise<Manifestation> {
    const manifestation = await this.manifestationRepository.findOne({where: {id}, relations: ['participants']});
    if(!manifestation) {
      throw new Error('Manifestation not found');
    }
    
    if (manifestation.creatorId === sub) {
      throw new Error('You are the creator of this manifestation');
    }

    const participant = new Participant();
    participant.participantId = sub;

    await this.participantRepository.save(participant);

    manifestation.participants.push(participant);
    return this.manifestationRepository.save(manifestation);
  }
}
