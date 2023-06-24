import { Body, Controller, Get, HttpStatus, Param, ParseFilePipeBuilder, Patch, Post, Put, Request, UploadedFile, UseInterceptors } from '@nestjs/common';
import { TrashService } from './trash.service';
import { Public } from '../authentication/decorators/public.decorator';
import { TrashDto } from './dto/trash.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { Multer } from 'multer';

@Controller('trash')
export class TrashController {
  constructor(private readonly trashService: TrashService) {}

  @Get()
  @Public()
  findAll() {
    return this.trashService.findAll();
  }

  @Get(':id')
  @Public()
  findOne(@Param('id') id: string) {
    return this.trashService.findOne(id);
  }

  @Get('myTrash/:posterId')
  @Public()
  findAllByUser(@Param('posterId') posterId: string) {
    return this.trashService.findAllByUser(posterId);
  }

  @Post()
  @UseInterceptors(FileInterceptor('trashImage'))
  async create(
    @Request() req: any,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'image',
        })
        .addMaxSizeValidator({
          maxSize: 10 * 1024 * 1024,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
        }),
    )
    file: Express.Multer.File,
    @Body('data') data: string
  ) {
    const trashDto = new TrashDto();
    trashDto.data = JSON.parse(data);
    return this.trashService.create(req.user.sub, trashDto, file);
  }

  @Put(':id')
  @Public()
  update(@Param('id') id: string, @Body() updateTrashDto: TrashDto) {
    return this.trashService.update(id, updateTrashDto);
  }

  @Patch(':id')
  takeTrash(@Request() req: any, @Param('id') id: string) {
    return this.trashService.takeTrash(id, req.user.sub);
  }
}
