import { Body, Controller, Delete, Get, HttpStatus, Param, ParseFilePipeBuilder, Post, Put, Request, UploadedFile, UseInterceptors } from '@nestjs/common';
import { TrashService } from './trash.service';
import { TrashDto } from './dto/trash.dto';
import { UpdateTrashDto } from './dto/updateTrash.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { Role } from '@j-irais-bruler-chez-vous/shared';
import { Roles } from '../user/role/decorators/role.decorator';

interface RequestWithUser extends Request {
  user: {
    sub: string;
  };
}

@Controller('trash')
export class TrashController {
  constructor(private readonly trashService: TrashService) {}

  @Get()
  findAll() {
    return this.trashService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.trashService.findOne(id);
  }

  @Get('myTrash/:posterId')
  findAllByUser(@Param('posterId') posterId: string) {
    return this.trashService.findAllByUser(posterId);
  }

  @Post()
  @UseInterceptors(FileInterceptor('trashImage'))
  async create(
    @Request() req: RequestWithUser,
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
  update(
    @Param('id') id: string,
    @Body('data') data: string
  ){
    console.log('api controleeeeeeeeeeeer',data);
    const updateTrashDto = new UpdateTrashDto();
    updateTrashDto.data = JSON.parse(data);
    return this.trashService.update(id, updateTrashDto);
  }

  @Post(':id/contract')
  takeContract(@Param('id') id: string, @Request() req: RequestWithUser) {
    return this.trashService.takeContract(id, req.user.sub);
  }

  @Delete(':id/contract')
  removeBurner(@Param('id') id: string, @Request() req: RequestWithUser) {
    return this.trashService.removeBurner(id, req.user.sub);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  remove(@Param('id') id: string, @Request() req: RequestWithUser) {
    return this.trashService.remove(id, req.user.sub);
  }
}
