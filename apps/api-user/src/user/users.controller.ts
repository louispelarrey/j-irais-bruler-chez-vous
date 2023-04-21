import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { Public } from '@api-authentication/authentication/decorators/public.decorator';
import { Roles } from '../role/decorators/role.decorator';
import { Role } from '../role/enums/role.enum';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserIsAllowedChange } from './guard/user-is-allow-change.guard';
import { Users } from './users.entity';
import { UserService } from './users.service';

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
}
