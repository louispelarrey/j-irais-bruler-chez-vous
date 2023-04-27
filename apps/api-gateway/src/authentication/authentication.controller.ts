import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Public } from './decorators/public.decorator';

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
