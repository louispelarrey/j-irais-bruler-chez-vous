import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { Public } from './decorators/public.decorator';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller('authentication')
export class AuthenticationController {
  constructor(
    private authService: AuthenticationService) { }

  @Post('login')
  @Public()
  @UseGuards(LocalAuthGuard)
  @EventPattern('login')
  async login(@Request() {body}: any) {
    return this.authService.login(body);
  }

  @Public()
  @EventPattern('test')
  test(@Payload() data: any) {
    return this.authService.testFunction(data);
  }
}
