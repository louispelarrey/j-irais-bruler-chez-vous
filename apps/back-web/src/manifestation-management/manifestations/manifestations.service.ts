import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Manifestations } from './manifestations.entity';
import { CreateManifestationDto } from './dto/create-manifestation.dto';
import { UpdateManifestationDto } from './dto/update-manifestation.dto';
import { Users } from '../../user-management/user/users.entity';

interface UserJWT {
  sub: number;

  username: string

  roles: string[]
}

@Injectable()
export class ManifestationsService {

  constructor(
    @InjectRepository(Manifestations)
    private readonly ManifestationRepository: Repository<Manifestations>,

    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>
  ) { }

  /**
   * Find all manifestations
   * @returns {Promise<Manifestation>} List of manifestations
   */
  async findAll(): Promise<Manifestations[]> {
    return await this.ManifestationRepository.find();
  }

  /**
   * Find a specific Manifestation by his ID
   * @param id
   * @returns {Promise<Manifestation>} Found Manifestation
   */
  async findOne(id: number): Promise<Manifestations> {
    const Manifestation = await this.ManifestationRepository.findOneBy({ id });
    return Manifestation;
  }

  /**
   * Create a new Manifestation
   * @param {CreateManifestationDto} createManifestationDto
   * @returns {Promise<Manifestation>} Created Manifestation
   */
  async createManifestation(createManifestationDto: CreateManifestationDto, userJwt: UserJWT): Promise<Manifestations> {
    const Manifestation = new Manifestations();
    Manifestation.name = createManifestationDto.name;
    Manifestation.description = createManifestationDto.description;
    // const userEntity = await this.usersRepository.findOneBy({ id: userJwt.sub });
    // Manifestation.user = userEntity
    return this.ManifestationRepository.save(Manifestation);
  }

  /**
   * Update a specific Manifestation
   * @param {number} id
   * @param {UpdateManifestationDto} updateManifestationDto
   * @returns {Promise<Manifestation>} Updated Manifestation
   */
  async updateManifestation(id: number, updateManifestationDto: UpdateManifestationDto): Promise<Manifestations> {
    const user = await this.ManifestationRepository.findOneBy({ id });
    user.name = updateManifestationDto.name;
    user.description = updateManifestationDto.description;
    return this.ManifestationRepository.save(user);
  }
}
