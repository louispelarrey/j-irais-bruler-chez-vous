import { Body, Controller, Get, Param, Post, Put, Request } from '@nestjs/common';
import { ManifestationsService } from './manifestations.service';
import { CreateManifestationDto } from './dto/create-manifestation.dto';
import { Manifestations } from './manifestations.entity';
import { Public } from '../../authentication/decorators/public.decorator';
import { UpdateManifestationDto } from './dto/update-manifestation.dto';

@Controller('Manifestations')
export class ManifestationsController {
    constructor(
        private readonly Manifestationservice: ManifestationsService
    ) {}

    @Get()
    @Public()
    async findAll(): Promise<Manifestations[]> {
        return await this.Manifestationservice.findAll();
    }

    @Post()
    async createManifestation(@Body() createManifestationDto: CreateManifestationDto, @Request() req): Promise<Manifestations> {
        return await this.Manifestationservice.createManifestation(createManifestationDto, req.user);
    }

    @Get('/:id')
    @Public()
    async findOne(@Param('id') id: number): Promise<Manifestations> {
        return await this.Manifestationservice.findOne(id);
    }

    @Put('/:id')
    async updateManifestation(@Param('id') id: number, @Body() updateManifestationDto: UpdateManifestationDto): Promise<Manifestations> {
        return await this.Manifestationservice.updateManifestation(id, updateManifestationDto);
    }
}
