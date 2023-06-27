import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { Roles } from './role/decorators/role.decorator';
import { Public } from '../authentication/decorators/public.decorator';
import { UserIsAllowedChange } from './guard/user-is-allow-change.guard';
import { Role } from '@j-irais-bruler-chez-vous/shared';
import { CreateUserDto } from '@j-irais-bruler-chez-vous/user/feature';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

    // @Get()
  // @Roles(Role.Admin)
  // async findAll(): Promise<Users[]> {
  //   return await this.userService.findAll();
  // }

  // @Get(':id')
  // @UseGuards(UserIsAllowedChange)
  // async findOne(@Param('id') id: string): Promise<Users> {
  //   return await this.userService.findOne(id);
  // }

  // @Post()
  // @Public()
  // async createUser(@Body() createUserDto: CreateUserDto): Promise<Users> {
  //   return await this.userService.createUser(createUserDto);
  // }

  // @Put(':id')
  // @UseGuards(UserIsAllowedChange)
  // async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<Users> {
  //   return await this.userService.updateUser(id, updateUserDto);
  // }

  // @Delete(':id')
  // @UseGuards(UserIsAllowedChange)
  // async deleteUser(@Param('id') id: string): Promise<Users> {
  //   return await this.userService.deleteUser(id);
  // }

  @Get()
  @Roles(Role.Admin)
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @Public()
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Post()
  @Public()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Put(':id')
  @UseGuards(UserIsAllowedChange)
  updateUser(@Param('id') id: string, @Body() updateUserDto: CreateUserDto) {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(UserIsAllowedChange)
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }

}
