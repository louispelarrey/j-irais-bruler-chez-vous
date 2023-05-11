import {Body, Controller, Get, Param, Post, Put, Request} from '@nestjs/common';
import { Public } from '../authentication/decorators/public.decorator';
import {ManifestationService} from "./manifestation.service";
import {CreateManifestationDto} from "./dto/create-manifestation.dto";
import {UpdateManifestationDto} from "./dto/update-manifestation";


@Controller('manifestation')
export class ManifestationController {
  constructor(private readonly manifestationService: ManifestationService) {}


  @Get()
  findAll() {
    return this.manifestationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.manifestationService.findOne(id);
  }

  @Post()
  create(@Request() req, @Body() createManifestationDto: CreateManifestationDto) {
    return this.manifestationService.create(createManifestationDto, req.user.sub);
  }

  @Put(':id')
  update(@Param() id: string, @Body() updateManifestationDto: UpdateManifestationDto) {
    return this.manifestationService.update(id, updateManifestationDto);
  }
}
