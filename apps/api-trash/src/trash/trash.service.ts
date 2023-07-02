import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

  findAll() {
    //sort by date desc
    const trashs = this.trashRepository.find({
      order: { createdAt: 'DESC' },
    });
    return trashs;
  }

  findAllByUser(posterId: string) {
    const trashs = this.trashRepository.find({
      where: { posterId },
      order: { createdAt: 'ASC' },
    });
    return trashs;
  }

  async findOne(id: string) {
    const trash = await this.trashRepository.findOne({ where: { id } });
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

  async create(createTrashDto: TrashDto): Promise<Trash> {
    const trash = new Trash();
    trash.reference = createTrashDto.data.reference;
    trash.description = createTrashDto.data.description;
    trash.posterId = createTrashDto.data.posterId;
    trash.address = createTrashDto.data.address;
    trash.fileImageUrl = await this.fileUploadService.uploadFile(createTrashDto.file);
    return await this.trashRepository.save(trash);
  }

  async update(id: string, updateTrashDto: UpdateTrashDto): Promise<Trash> {
    const trash = await this.trashRepository.findOne({ where: { id } });
    trash.reference = updateTrashDto.reference;
    trash.description = updateTrashDto.description;
    return this.trashRepository.save(trash);
  }

  async takeContract(id: string, burnerId: string): Promise<Trash> {
    const trash = await this.trashRepository.findOne({ where: { id } });
    if (trash.posterId === burnerId) {
      throw new HttpException(
        'Le créateur ne peut pas être le bruleur',
        HttpStatus.BAD_REQUEST
      );
    }
    trash.burners.push(burnerId);
    return this.trashRepository.save(trash);
  }

  async remove(id: string, burnerId: string): Promise<Trash> {
    const trash = await this.trashRepository.findOne({ where: { id } });
    if (trash.posterId !== burnerId) {
      throw new HttpException(
        'Seul le créateur peut supprimer la poubelle',
        HttpStatus.BAD_REQUEST
      );
    }
    return this.trashRepository.remove(trash);
  }

  async removeBurner(id: string, burnerId: string): Promise<Trash> {
    const trash = await this.trashRepository.findOne({ where: { id } });
    if (trash.posterId !== burnerId && !trash.burners.includes(burnerId)) {
      throw new HttpException(
        'Seuls le créateur ou le bruleur peuvent annuler le contrat',
        HttpStatus.BAD_REQUEST
      );
    }
    trash.burners = trash.burners.filter((burner) => burner !== burnerId);
    return this.trashRepository.save(trash);
  }
}
