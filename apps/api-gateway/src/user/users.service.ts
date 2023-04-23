import { CreateUserDto } from '@j-irais-bruler-chez-vous/user/feature';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER') private readonly userClient: ClientProxy,
  ){}

  createUser(createUserDto: CreateUserDto) {
    return this.userClient.send('createUser', createUserDto);
  }
}
