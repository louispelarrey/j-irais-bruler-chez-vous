import { Controller } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { AuthenticationService } from '@j-irais-bruler-chez-vous/authentication/feature';


@Controller('authentication')
export class AuthenticationController {
  constructor(
    private authService: AuthenticationService) { }

  @MessagePattern('login')
  async handleLogin(@Payload() { username, password }: {username: string, password: string}) {
    const result = await this.authService.login(username, password);
  
    if (result === null) {
      throw new RpcException('Invalid login attempt');
    }
    
    return result;
  }

  @MessagePattern('validateUser')
  async handleValidateUser(@Payload() { identifier, password }: {identifier: string, password: string}) {
    return this.authService.validateUser(identifier, password);
  }
}
