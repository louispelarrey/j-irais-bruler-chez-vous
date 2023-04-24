import { Controller } from '@nestjs/common';
import {
  CreateUserDto,
  UsersService,
} from '@j-irais-bruler-chez-vous/user/feature';
import { Users } from '@j-irais-bruler-chez-vous/user/feature';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @MessagePattern('findUserByIdentifier')
  async findUserByIdentifier(@Payload() identifier: string): Promise<Users> {
    return this.userService.findByIdentifier(identifier);
  }

  @MessagePattern('createUser')
  handleCreateUser(@Payload() createUserDto: CreateUserDto): Promise<Users> {
    return this.userService.createUser(createUserDto);
  }

  @MessagePattern('updateUser')
  handleUpdateUser(
    @Payload()
    { id, updateUserDto }: { id: string; updateUserDto: CreateUserDto }
  ): Promise<Users> {
    return this.userService.updateUser(id, updateUserDto);
  }

  @MessagePattern('deleteUser')
  handleDeleteUser(@Payload() id: string): Promise<Users> {
    return this.userService.deleteUser(id);
  }

  @MessagePattern('findAllUsers')
  handleFindAllUsers(): Promise<Users[]> {
    return this.userService.findAll();
  }
}
