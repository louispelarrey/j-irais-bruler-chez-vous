import {Controller, Param} from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {ManifestationService} from "./manifestation.service";
import {Manifestation} from "./manifestation.entity";
import {CreateManifestationDto} from "./dto/create-manifestation.dto";
import {UpdateManifestationDto} from "./dto/update-manifestation.dto";

@Controller('manifestation')
export class ManifestationController {
  constructor(private readonly manifestationService: ManifestationService) {}

  @MessagePattern('findAll')
  async findAll() {
    return this.manifestationService.findAll();
  }

  @MessagePattern('findOne')
  async findOne(@Payload() id: string): Promise<Manifestation> {
    return await this.manifestationService.findOne(id);
  }

  @MessagePattern('create')
  async create(@Payload() createManifestationDto: CreateManifestationDto): Promise<Manifestation> {
    return this.manifestationService.create(createManifestationDto);
  }

  @MessagePattern('update')
  async update(@Param('id') id: string, @Payload() updateManifestationDto: UpdateManifestationDto): Promise<Manifestation> {
    return this.manifestationService.update(id, updateManifestationDto);
  }

  @MessagePattern('joinManifestation')
  async joinManifestation(@Payload() { id, participantId }: { id: string, participantId: string }): Promise<Manifestation> {
    return this.manifestationService.joinManifestation(id, participantId);
  }
}
