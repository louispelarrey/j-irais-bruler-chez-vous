import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { TrashsService } from './trashs.service';
import { CreateTrashDto } from './dto/create-trash.dto';
import { Trashs } from './trashs.entity';
import { Public } from '../../authentication/decorators/public.decorator';

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
    async createTrash(@Body() body: CreateTrashDto) {
        console.log(body);
    }

    @Get('/:id')
    async findOne(@Param('id') id: number): Promise<Trashs> {
        return await this.trashService.findOne(id);
    }

    @Put('/:id')
    async updateTrash(@Param('id') id: number, @Body() body: CreateTrashDto): Promise<Trashs> {
        return await this.trashService.updateTrash(id, body);
    }
}
