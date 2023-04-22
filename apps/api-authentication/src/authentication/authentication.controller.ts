import { Controller, Request, UseGuards } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { AuthenticationService, Public, LocalAuthGuard } from '@j-irais-bruler-chez-vous/authentication/feature';

@Controller('authentication')
export class AuthenticationController {
  constructor(
    private authService: AuthenticationService) { }

  @Public()
  @UseGuards(LocalAuthGuard)
  @MessagePattern('login')
  async handleLogin(@Payload() body: any) {
    return this.authService.login(body);
  }

  @Public()
  @EventPattern('test')
  test(@Payload() data: any) {
    return this.authService.testFunction(data);
  }
}
