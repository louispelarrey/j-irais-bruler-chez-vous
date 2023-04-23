import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { LocalAuthGuard, Public } from '@j-irais-bruler-chez-vous/authentication/feature';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  getLogin(@Body() body: any) {
    return this.authenticationService.getLogin(body);
  }
}
