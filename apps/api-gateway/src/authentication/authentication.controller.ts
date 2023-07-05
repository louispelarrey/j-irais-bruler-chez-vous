import { Body, Controller, Get, Post, UseGuards, NotFoundException } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Public } from './decorators/public.decorator';
import { lastValueFrom } from 'rxjs';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  /**
   * Handles the login request.
   * @param username - The username provided in the request body.
   * @returns The user information if the login is successful.
   */
  @UseGuards(LocalAuthGuard)
  @Public()
  @Post('/login')
  async getLogin(@Body() { username, password }: {username: string, password: string}) {
    const user = await lastValueFrom(this.authenticationService.getLogin(username, password));

    return user;
  }
}
