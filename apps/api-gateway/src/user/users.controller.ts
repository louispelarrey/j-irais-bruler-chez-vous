import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from '@j-irais-bruler-chez-vous/user/feature';
import { Public } from '@j-irais-bruler-chez-vous/authentication/feature';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}


  @Post()
  @Public()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }
}
