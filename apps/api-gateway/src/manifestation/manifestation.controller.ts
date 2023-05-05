import { Controller, Get } from '@nestjs/common';
import { Public } from '../authentication/decorators/public.decorator';
import {ManifestationService} from "./manifestation.service";

@Controller('manifestation')
export class ManifestationController {
  constructor(private readonly manifestationService: ManifestationService) {}

  @Get()
  @Public()
  findAll() {
    return this.manifestationService.findAll();
  }
}
