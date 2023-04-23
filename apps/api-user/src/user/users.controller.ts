import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { Public } from '@j-irais-bruler-chez-vous/authentication/feature';
import { CreateUserDto, UpdateUserDto, UserIsAllowedChange, UserService } from '@j-irais-bruler-chez-vous/user/feature';
import { Role, Roles, Users } from '@j-irais-bruler-chez-vous/user/feature'
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UserService,
  ) { }

  @Get()
  @Roles(Role.Admin)
  async findAll(): Promise<Users[]> {
    return await this.userService.findAll();
  }

  @Get(':id')
  @UseGuards(UserIsAllowedChange)
  async findOne(@Param('id') id: string): Promise<Users> {
    return await this.userService.findOne(id);
  }

  @Post()
  @Public()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<Users> {
    return await this.userService.createUser(createUserDto);
  }

  @Put(':id')
  @UseGuards(UserIsAllowedChange)
  async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<Users> {
    return await this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(UserIsAllowedChange)
  async deleteUser(@Param('id') id: string): Promise<Users> {
    return await this.userService.deleteUser(id);
  }

  @MessagePattern('findUserByIdentifier')
  async findUserByIdentifier(@Payload() identifier: string): Promise<Users> {
    return this.userService.findByIdentifier(identifier);
  }

  @MessagePattern('createUser')
  handleCreateUser(@Payload() createUserDto: CreateUserDto): Promise<Users> {
    return this.userService.createUser(createUserDto);
  }
}
