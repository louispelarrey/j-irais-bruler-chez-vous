import {Inject, Injectable} from "@nestjs/common";
import { ClientProxy } from '@nestjs/microservices';
import {CreateManifestationDto} from "./dto/create-manifestation.dto";
import {UpdateManifestationDto} from "./dto/update-manifestation";


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
    return this.manifestationClient.send('findOne', id);
  }

  async create(createManifestationDto: CreateManifestationDto) {
    return this.manifestationClient.send('create', createManifestationDto);
  }

  async update(id: string, updateManifestationDto: UpdateManifestationDto) {
    return this.manifestationClient.send('update', { id, updateManifestationDto });
  }
}
