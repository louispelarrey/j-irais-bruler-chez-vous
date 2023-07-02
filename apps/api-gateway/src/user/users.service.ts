import { CreateUserDto } from '@j-irais-bruler-chez-vous/user/feature';
import { UpdateUserDto } from '@j-irais-bruler-chez-vous/user/feature';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from "rxjs";

@Injectable()
export class UsersService {

  constructor(
    @Inject('USER') private readonly userClient: ClientProxy,
  ){}

  findAll() {
    return this.userClient.send('findAll', {});
  }

  createUser(createUserDto: CreateUserDto) {
    return this.userClient.send('createUser', createUserDto);
  }

  findOne(id: string) {
    return this.userClient.send('findUserById', id);
  }

  findUserByIdentifier(identifier: string) {
    return this.userClient.send('findUserByIdentifier', identifier);
  }

  updateUser(id: string, updateUserDto: UpdateUserDto) {
    return this.userClient.send('updateUser', { id, updateUserDto });
  }

  deleteUser(id: string) {
    return this.userClient.send('deleteUser', id);
  }

  forgotPassword(email: string) {
    return this.userClient.send('forgotPassword', email);
  }

  forgotPasswordToken(id: string, password: string) {
    return this.userClient.send('forgotPasswordToken', {id, password});
  }
}
