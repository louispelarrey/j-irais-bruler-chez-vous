import {Body, Controller, Get, Param, Post, Put} from '@nestjs/common';
import { Public } from '../authentication/decorators/public.decorator';
import {ManifestationService} from "./manifestation.service";
import {CreateManifestationDto} from "./dto/create-manifestation.dto";
import {UpdateManifestationDto} from "./dto/update-manifestation";


@Controller('manifestation')
export class ManifestationController {
  constructor(private readonly manifestationService: ManifestationService) {}


  @Get()
  @Public()
  findAll() {
    return this.manifestationService.findAll();
  }

  @Get(':id')
  @Public()
  findOne(@Param('id') id: string) {
    return this.manifestationService.findOne(id);
  }

  @Post()
  @Public()
  create(@Body() createManifestationDto: CreateManifestationDto) {
    return this.manifestationService.create(createManifestationDto);
  }

  @Put(':id')
  @Public()
  update(@Param() id: string, @Body() updateManifestationDto: UpdateManifestationDto) {
    return this.manifestationService.update(id, updateManifestationDto);
  }
}
