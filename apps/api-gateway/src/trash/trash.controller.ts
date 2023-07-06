import { Body, Controller, Delete, Get, HttpStatus, Param, ParseFilePipeBuilder, Post, Put, Query, Request, UploadedFile, UseInterceptors } from '@nestjs/common';
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

  /**
   * Get all trash .
   * @returns An array of trash .
   */
  @Get()
  findAll() {
    return this.trashService.findAll();
  }

  @Get('heatmap')
  getHeatmapData(@Query('startDate') startDate: string) {
    return this.trashService.getHeatmapData(startDate);
  }

  /**
   * Get a specific trash  by its ID.
   * @param id - The ID of the trash .
   * @returns The trash  object.
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.trashService.findOne(id);
  }

  /**
   * Get all trash  posted by a user.
   * @param posterId - The ID of the user who posted the trash .
   * @returns An array of trash  posted by the user.
   */
  @Get('myTrash/:posterId')
  findAllByUser(@Param('posterId') posterId: string) {
    return this.trashService.findAllByUser(posterId);
  }

  /**
   * Create a new trash .
   * @param req - The HTTP request object.
   * @param file - The uploaded file (trash image).
   * @param data - The data for creating the trash .
   * @returns The created trash  object.
   */
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

  /**
   * Update a trash .
   * @param id - The ID of the trash  to update.
   * @param data - The updated data for the trash .
   * @returns The updated trash  object.
   */
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body('data') data: string
  ){
    const updateTrashDto = new UpdateTrashDto();
    updateTrashDto.data = JSON.parse(data);
    return this.trashService.update(id, updateTrashDto);
  }

  /**
   * Take a contract for a trash .
   * @param id - The ID of the trash  to take the contract for.
   * @param req - The HTTP request object.
   * @returns The updated trash  object with the contract taken.
   */
  @Post(':id/contract')
  takeContract(@Param('id') id: string, @Request() req: RequestWithUser) {
    return this.trashService.takeContract(id, req.user.sub);
  }

  /**
   * Remove a burner from a trash .
   * @param id - The ID of the trash  to remove the burner from.
   * @param req - The HTTP request object.
   * @returns The updated trash  object with the burner removed.
   */
  @Delete(':id/contract')
  removeBurner(@Param('id') id: string, @Request() req: RequestWithUser) {
    return this.trashService.removeBurner(id, req.user.sub);
  }

  /**
   * Remove a trash .
   * @param id - The ID of the trash  to remove.
   * @param req - The HTTP request object.
   * @returns The removed trash  object.
   */
  @Delete(':id')
  @Roles(Role.Admin)
  remove(@Param('id') id: string, @Request() req: RequestWithUser) {
    return this.trashService.remove(id, req.user.sub);
  }

  @Post(':id/end')
  endContract(@Param('id') id: string, @Request() req: RequestWithUser) {
    return this.trashService.endContract(id, req.user.sub);
  }
}
