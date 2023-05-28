import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthenticationService } from '@j-irais-bruler-chez-vous/authentication/feature';

@Controller('authentication')
export class AuthenticationController {
  constructor(
    private authService: AuthenticationService) { }

  @MessagePattern('login')
  async handleLogin(@Payload() username: string) {
    return this.authService.login(username);
  }

  @MessagePattern('validateUser')
  async handleValidateUser(@Payload() { identifier, password }: {identifier: string, password: string}) {
    return this.authService.validateUser(identifier, password);
  }
}
