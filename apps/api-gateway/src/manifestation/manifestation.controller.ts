import {Body, Controller, Get, Param, Patch, Post, Put, Request, UsePipes, ValidationPipe} from '@nestjs/common';
import {ManifestationService} from "./manifestation.service";
import {CreateManifestationDto} from "./dto/create-manifestation.dto";
import {UpdateManifestationDto} from "./dto/update-manifestation";
import { Public } from '../authentication/decorators/public.decorator';

interface RequestWithUser extends Request {
  user: {
    sub: string;
  };
}

@Controller('manifestation')
export class ManifestationController {
  constructor(private readonly manifestationService: ManifestationService) {}

  /**
   * Get all manifestations.
   * @returns An array of manifestations.
   */
  @Get()
  @Public()
  findAll() {
    return this.manifestationService.findAll();
  }

  /**
   * Get a specific manifestation by its ID.
   * @param id - The ID of the manifestation.
   * @returns The manifestation object.
   */
  @Get(':id')
  @Public()
  findOne(@Param('id') id: string) {
    return this.manifestationService.findOne(id);
  }

  /**
   * Find manifestations created by the authenticated user.
   * @param req - The request object containing the authenticated user information.
   * @returns An array of manifestations created by the user.
   */
  @Post('/me')
  @UsePipes(new ValidationPipe())
  findMyManifestations(@Request() req: RequestWithUser) {
    return this.manifestationService.findMyManifestations(req.user.sub);
  }

  /**
   * Create a new manifestation.
   * @param req - The request object containing the authenticated user information.
   * @param createManifestationDto - The data for creating the manifestation.
   * @returns The created manifestation object.
   */
  @Post()
  @UsePipes(new ValidationPipe())
  create(@Request() req, @Body() createManifestationDto: CreateManifestationDto) {
    return this.manifestationService.create(createManifestationDto, req.user.sub);
  }

  /**
   * Update a manifestation.
   * @param id - The ID of the manifestation to update.
   * @param updateManifestationDto - The updated data for the manifestation.
   * @returns The updated manifestation object.
   */
  @Put(':id')
  @UsePipes(new ValidationPipe())
  update(@Request() req, @Param('id') id: string, @Body() updateManifestationDto: UpdateManifestationDto) {
    return this.manifestationService.update(id, updateManifestationDto, req.user.sub);
  }

  /**
   * Join a manifestation.
   * @param req - The request object containing the authenticated user information.
   * @param id - The ID of the manifestation to join.
   * @returns The updated manifestation object with the user added to the participants.
   */
  @Patch(':id')
  @UsePipes(new ValidationPipe())
  joinManifestation(@Request() req: RequestWithUser, @Param('id') id: string) {
    return this.manifestationService.joinManifestation(id, req.user.sub);
  }

  /**
   * Leave a manifestation.
   * @param req - The request object containing the authenticated user information.
   * @param id - The ID of the manifestation to leave.
   * @returns The updated manifestation object with the user removed from the participants.
   */
  @Patch(':id/left')
  @UsePipes(new ValidationPipe())
  leftManifestation(@Request() req: RequestWithUser, @Param('id') id: string) {
    return this.manifestationService.leftManifestation(id, req.user.sub);
  }

  /**
   * Delete a manifestation.
   * @param id - The ID of the manifestation to delete.
   * @param req - The request object containing the authenticated user information.
   * @returns The deleted manifestation object.
   */
  @Delete(':id')
  deleteManifestation(@Request() req: RequestWithUser, @Param('id') id: string) {
    return this.manifestationService.deleteManifestation(id, req.user.sub);
  }
}
