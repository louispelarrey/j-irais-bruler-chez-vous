import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Trash } from './trash.entity';
import { TrashDto } from './dto/trash.dto';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class TrashService {
  constructor(
    @InjectRepository(Trash)
    private readonly trashRepository: Repository<Trash>,

    @Inject('USER')
    private readonly userClient: ClientProxy
  ) {}

  findAll() {
    const trashs = this.trashRepository.find();
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
    trash.burners = await Promise.all(
      trash.burners.map(async burnerId => {
        return await lastValueFrom(
          this.userClient.send('findUserById', burnerId)
        );
      })
    );
    return trash;
  }

  async create(createTrashDto: TrashDto): Promise<Trash> {
    const trash = new Trash();
    trash.reference = createTrashDto.reference;
    trash.description = createTrashDto.description;
    trash.posterId = createTrashDto.posterId;
    trash.address = createTrashDto.address;
    return await this.trashRepository.save(trash);
  }

  async update(id: string, updateTrashDto: TrashDto): Promise<Trash> {
    const trash = await this.trashRepository.findOne({ where: { id } });
    trash.reference = updateTrashDto.reference;
    trash.description = updateTrashDto.description;
    trash.address = updateTrashDto.address;
    return this.trashRepository.save(trash);
  }

  async takeTrash(id: string, burnerId: string): Promise<Trash> {
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
}
