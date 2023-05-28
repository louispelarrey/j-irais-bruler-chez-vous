import { Body, Controller, Get, Post, UseGuards, NotFoundException } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Public } from './decorators/public.decorator';
import { lastValueFrom } from 'rxjs';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @UseGuards(LocalAuthGuard)
  @Public()
  @Post('/login')
  async getLogin(@Body() { username }: {username: string}) {
    const user = await lastValueFrom(this.authenticationService.getLogin(username));

    return user;
  }
}
