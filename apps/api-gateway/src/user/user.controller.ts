import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from '@j-irais-bruler-chez-vous/user/feature';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}


  @Post('/users')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }
}
