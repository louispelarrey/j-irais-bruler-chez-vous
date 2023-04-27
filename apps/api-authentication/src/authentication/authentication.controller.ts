import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthenticationService } from '@j-irais-bruler-chez-vous/authentication/feature';

@Controller('authentication')
export class AuthenticationController {
  constructor(
    private authService: AuthenticationService) { }

  @MessagePattern('login')
  async handleLogin(@Payload() body: any) {
    return this.authService.login(body);
  }

  @MessagePattern('validateUser')
  async handleValidateUser(@Payload() { identifier, password }: {identifier: string, password: string}) {
    return this.authService.validateUser(identifier, password);
  }
}
