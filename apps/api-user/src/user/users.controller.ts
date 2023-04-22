import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { Public } from '@j-irais-bruler-chez-vous/authentication/feature';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserIsAllowedChange } from './guard/user-is-allow-change.guard';
import { Role, Roles, Users } from '@j-irais-bruler-chez-vous/user/feature'
import { UserService } from './users.service';
import { MessagePattern } from '@nestjs/microservices';

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

  @MessagePattern({cmd: 'findUserByIdentifier'})
  async findUserByIdentifier(identifier: string): Promise<Users> {
    return this.userService.findByIdentifier(identifier);
  }
}
