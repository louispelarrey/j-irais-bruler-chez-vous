import { Body, Controller, Get, Param, Post, Put, Request } from '@nestjs/common';
import { TrashsService } from './trashs.service';
import { CreateTrashDto } from './dto/create-trash.dto';
import { Trashs } from './trashs.entity';
import { Public } from '../../authentication/decorators/public.decorator';
import { UpdateTrashDto } from './dto/update-trash.dto';

@Controller('trashs')
export class TrashsController {
    constructor(
        private readonly trashService: TrashsService
    ) {}

    @Get()
    @Public()
    async findAll(): Promise<Trashs[]> {
        return await this.trashService.findAll();
    }

    @Post()
    async createTrash(@Body() createTrashDto: CreateTrashDto, @Request() req): Promise<Trashs> {
        return await this.trashService.createTrash(createTrashDto, req.user);
    }

    @Get('/:id')
    async findOne(@Param('id') id: number): Promise<Trashs> {
        return await this.trashService.findOne(id);
    }

    @Put('/:id')
    async updateTrash(@Param('id') id: number, @Body() updateTrashDto: UpdateTrashDto): Promise<Trashs> {
        return await this.trashService.updateTrash(id, updateTrashDto);
    }
}
