import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from '@j-irais-bruler-chez-vous/user/feature';
import { Public } from '@j-irais-bruler-chez-vous/authentication/feature';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}


  @Post()
  @Public()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }
}
