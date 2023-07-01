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

  async findAll() {
    return this.manifestationClient.send('findAll', {});
  }

  async findOne(id: string) {
    console.log('Api one service');
    return this.manifestationClient.send('findOne', id);
  }

  async findMyManifestations(sub: string) {
    console.log('Api service');
    return await lastValueFrom(
      this.manifestationClient.send('findMyManifestations', sub)
    );
  }

  async create(createManifestationDto: CreateManifestationDto, sub:string) {
    return this.manifestationClient.send('create', {
      description: createManifestationDto.description,
      title: createManifestationDto.title,
      ville: createManifestationDto.ville,
      start_date: createManifestationDto.start_date,
      creatorId: sub,
    });
  }

  async update(id: string, updateManifestationDto: UpdateManifestationDto) {
    return this.manifestationClient.send('update', { id, updateManifestationDto });
  }

  async joinManifestation(id: string,  sub: string) {
    return await lastValueFrom(
      this.manifestationClient.send('joinManifestation', {
        id,
        participantId: sub,
      })
    );
  }
}
