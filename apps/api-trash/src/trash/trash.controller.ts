import { Controller, Param } from '@nestjs/common';
import { TrashService } from './trash.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TrashDto } from './dto/trash.dto';
import { UpdateTrashDto } from './dto/updateTrash.dto';
import { Trash } from './trash.entity';

@Controller('trash')
export class TrashController {
  constructor(private readonly trashService: TrashService) {}

  /**
   * Retrieves all trash.
   * @returns {Promise<Trash[]>} A promise that resolves to an array of all trash.
   */
  @MessagePattern('findAll')
  async findAll() {
    return this.trashService.findAll();
  }

  @MessagePattern('getHeatmapData')
  async getHeatmapData(@Payload() {startDate}: {startDate: string}) {
    return this.trashService.getHeatmapData(startDate);
  }

  /**
   * Retrieves all trash posted by a specific user.
   * @param {string} posterId - The ID of the user.
   * @returns {Promise<Trash[]>} A promise that resolves to an array of trash posted by the user.
   */
  @MessagePattern('findAllByUser')
  async findAllByUser(@Payload() posterId: string): Promise<Trash[]> {
    return this.trashService.findAllByUser(posterId);
  }

  /**
   * Retrieves a specific trash by its ID.
   * @param {string} id - The ID of the trash.
   * @returns {Promise<Trash>} A promise that resolves to the requested trash.
   */
  @MessagePattern('findOne')
  async findOne(@Payload() id: string): Promise<Trash> {
    return await this.trashService.findOne(id);
  }

  /**
   * Creates a new trash.
   * @param {TrashDto} createTrashDto - The data for creating the trash.
   * @returns {Promise<Trash>} A promise that resolves to the created trash.
   */
  @MessagePattern('create')
  async create(@Payload() createTrashDto: TrashDto): Promise<Trash> {
    return this.trashService.create(createTrashDto);
  }

  /**
   * Updates a specific trash.
   * @param {string} id - The ID of the trash to update.
   * @param {UpdateTrashDto} updateTrashDto - The updated data for the trash.
   * @returns {Promise<Trash>} A promise that resolves to the updated trash.
   */
  @MessagePattern('update')
  async update(@Payload(){id, updateTrashDto}: {id: string, updateTrashDto: UpdateTrashDto}): Promise<Trash> {
    console.log('trash controller', updateTrashDto);
    return this.trashService.update(id, updateTrashDto);
  }

  /**
   * Takes a contract for a specific trash.
   * @param {string} id - The ID of the trash.
   * @param {string} burnerId - The ID of the user taking the contract.
   * @returns {Promise<Trash>} A promise that resolves to the updated trash with the assigned burner.
   */
  @MessagePattern('takeContract')
  async takeContract(@Payload() { id, burnerId }: { id: string, burnerId: string }): Promise<Trash> {
    return this.trashService.takeContract(id, burnerId);
  }

    /**
   * Removes a specific trash.
   * @param {string} id - The ID of the trash to remove.
   * @param {string} burnerId - The ID of the user requesting the removal.
   * @returns {Promise<Trash>} A promise that resolves to the removed trash.
   */
  @MessagePattern('remove')
  async remove(@Payload() { id, burnerId }: { id: string, burnerId: string }): Promise<Trash> {
    return this.trashService.remove(id, burnerId);
  }

  /**
   * Removes the assigned burner from a specific trash.
   * @param {string} id - The ID of the trash.
   * @param {string} burnerId - The ID of the burner to remove.
   * @returns {Promise<Trash>} A promise that resolves to the updated trash with the burner removed.
   */
  @MessagePattern('removeBurner')
  async removeBurner(@Payload() { id, burnerId }: { id: string, burnerId: string }): Promise<Trash> {
    return await this.trashService.removeBurner(id, burnerId);
  }

  @MessagePattern('endContract')
  async endContract(@Payload() { id, burnerId }: { id: string, burnerId: string }): Promise<Trash> {
    return await this.trashService.endContract(id, burnerId);
  }
}
