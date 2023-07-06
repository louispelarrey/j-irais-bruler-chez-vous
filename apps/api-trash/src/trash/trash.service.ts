import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { Trash } from './trash.entity';
import { TrashDto } from './dto/trash.dto';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { FileUploadService } from '../file-upload/file-upload.service';
import { UpdateTrashDto } from './dto/updateTrash.dto';

@Injectable()
export class TrashService {

  constructor(
    @InjectRepository(Trash)
    private readonly trashRepository: Repository<Trash>,

    @Inject('USER')
    private readonly userClient: ClientProxy,

    private readonly fileUploadService: FileUploadService
  ) {}

  /**
   * Retrieves all trash sorted by date in descending order.
   * @returns {Promise<Trash[]>} A promise that resolves to an array of all trash.
   */
  findAll() {
    const trashs = this.trashRepository.find({
      order: { createdAt: 'DESC' },
    });
    return trashs;
  }

  /**
   * Retrieves all trash posted by a specific user, sorted by date in ascending order.
   * @param {string} posterId - The ID of the user.
   * @returns {Promise<Trash[]>} A promise that resolves to an array of trash posted by the user.
   */
  findAllByUser(posterId: string) {
    const trashs = this.trashRepository.find({
      where: { posterId },
      order: { createdAt: 'ASC' },
    });
    return trashs;
  }

  async getHeatmapData(startDate: string) {
    //select createdAt >= startDate
    const trashs = await this.trashRepository.find({
      select: ['latitude', 'longitude'],
      where: {
        createdAt: MoreThanOrEqual(new Date(startDate))
      }
    });
    // // Récupérer le createdAt le plus vieux et le plus récent
    // const oldestCreatedAt = await this.trashRepository.createQueryBuilder()
    //   .select("MIN(trash.createdAt)", "min")
    //   .getRawOne();

    // const newestCreatedAt = await this.trashRepository.createQueryBuilder()
    //   .select("MAX(trash.createdAt)", "max")
    //   .getRawOne();

    return {
      trashs,
      // minDate: oldestCreatedAt.min ? new Date(oldestCreatedAt.min).toISOString() : null,
      // maxDate: newestCreatedAt.max ? new Date(newestCreatedAt.max).toISOString() : null,
    };
  }

  /**
   * Retrieves a specific trash by its ID.
   * @param {string} id - The ID of the trash.
   * @returns {Promise<Trash>} A promise that resolves to the requested trash.
   */
  async findOne(id: string) {
    const trash = await this.trashRepository.findOne({ where: { id } });
    if (!trash) {
      throw new HttpException(
        'Poubelle non trouvée',
        HttpStatus.NOT_FOUND
      );
    }
    trash.posterId = await lastValueFrom(
      this.userClient.send('findUserById', trash.posterId)
    );
    if (trash.burners.length > 0) {
      trash.burners = await Promise.all(
        trash.burners.map(async (burnerId) => {
          return await lastValueFrom(
            this.userClient.send('findUserById', burnerId)
          );
        })
      );
    }

    return trash;
  }

  /**
   * Creates a new trash.
   * @param {TrashDto} createTrashDto - The data for creating the trash.
   * @returns {Promise<Trash>} A promise that resolves to the created trash.
   */
  async create(createTrashDto: TrashDto): Promise<Trash> {
    const trash = new Trash();
    trash.reference = createTrashDto.data.reference;
    trash.description = createTrashDto.data.description;
    trash.posterId = createTrashDto.data.posterId;
    trash.address = createTrashDto.data.address;
    trash.latitude = createTrashDto.data.latitude;
    trash.longitude = createTrashDto.data.longitude;
    trash.fileImageUrl = await this.fileUploadService.uploadFile(createTrashDto.file);
    return await this.trashRepository.save(trash);
  }

  /**
   * Updates a specific trash.
   * @param {string} id - The ID of the trash to update.
   * @param {UpdateTrashDto} updateTrashDto - The updated data for the trash.
   * @returns {Promise<Trash>} A promise that resolves to the updated trash.
   */
  async update(id: string, updateTrashDto: UpdateTrashDto): Promise<Trash> {
    const trash = await this.trashRepository.findOne({ where: { id } });
    trash.reference = updateTrashDto.reference;
    trash.description = updateTrashDto.description;
    return this.trashRepository.save(trash);
  }

  /**
   * Assigns a burner to a specific trash.
   * @param {string} id - The ID of the trash.
   * @param {string} burnerId - The ID of the burner to assign.
   * @returns {Promise<Trash>} A promise that resolves to the updated trash with the assigned burner.
   * @throws {HttpException} If the poster ID is the same as the burner ID.
   */
  async takeContract(id: string, burnerId: string): Promise<Trash> {
    const trash = await this.trashRepository.findOne({ where: { id } });
    if(!trash) {
      throw new HttpException(
        'Poubelle non trouvée',
        HttpStatus.NOT_FOUND
      );
    }
    if (trash.isBurned) {
      throw new HttpException(
        'Le contrat est déjà brulé',
        HttpStatus.BAD_REQUEST
      );
    }
    if (trash.posterId === burnerId) {
      throw new HttpException(
        'Le créateur ne peut pas être le bruleur',
        HttpStatus.BAD_REQUEST
      );
    }
    if (trash.burners.includes(burnerId)) {
      throw new HttpException(
        'Le bruleur est déjà assigné à cette poubelle',
        HttpStatus.BAD_REQUEST
      );
    }
    trash.burners.push(burnerId);
    this.userClient.send('addTrashToUser', { userId: burnerId, trashId: id })
    return this.trashRepository.save(trash);
  }

  /**
   * Removes a specific trash.
   * @param {string} id - The ID of the trash to remove.
   * @param {string} burnerId - The ID of the burner attempting to remove the trash.
   * @returns {Promise<Trash>} A promise that resolves to the removed trash.
   * @throws {HttpException} If the burner ID does not match the poster ID.
   */
  async remove(id: string, burnerId: string): Promise<Trash> {
    const trash = await this.trashRepository.findOne({ where: { id } });
    if(!trash) {
      throw new HttpException(
        'Poubelle non trouvée',
        HttpStatus.NOT_FOUND
      );
    }
    if (trash.posterId !== burnerId) {
      throw new HttpException(
        'Seul le créateur peut supprimer la poubelle',
        HttpStatus.BAD_REQUEST
      );
    }
    return this.trashRepository.remove(trash);
  }

  /**
   * Removes a burner from a specific trash.
   * @param {string} id - The ID of the trash.
   * @param {string} burnerId - The ID of the burner to remove.
   * @returns {Promise<Trash>} A promise that resolves to the updated trash with the burner removed.
   * @throws {HttpException} If the burner ID does not match the poster ID or the assigned burner ID.
   */
  async removeBurner(id: string, burnerId: string): Promise<Trash> {
    const trash = await this.trashRepository.findOne({ where: { id } });
    if(!trash) {
      throw new HttpException(
        'Poubelle non trouvée',
        HttpStatus.NOT_FOUND
      );
    }
    if (trash.posterId !== burnerId && !trash.burners.includes(burnerId) && !trash.isBurned) {
      throw new HttpException(
        'Seuls le créateur ou le bruleur peuvent annuler le contrat',
        HttpStatus.BAD_REQUEST
      );
    }
    trash.burners = trash.burners.filter((burner) => burner !== burnerId);
    return this.trashRepository.save(trash);
  }

  async endContract(id: string, burnerId: string): Promise<Trash> {
    const trash = await this.trashRepository.findOne({ where: { id } });
    if(!trash) {
      throw new HttpException(
        'Poubelle non trouvée',
        HttpStatus.NOT_FOUND
      );
    }
    if (trash.posterId !== burnerId && !trash.burners.includes(burnerId) && !trash.isBurned) {
      throw new HttpException(
        'Seuls le créateur ou le bruleur peuvent annuler le contrat si il est n\'est pas brulé',
        HttpStatus.BAD_REQUEST
      );
    }

    trash.isBurned = true;

    return this.trashRepository.save(trash);
  }
}
