import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AuthenticationService {
  public constructor(
    @Inject('AUTHENTICATION') private readonly authenticationClient: ClientProxy,
  ){}

  getLogin(body: any) {
    return this.authenticationClient.send('login', body)
  }

  validateUser(identifier: string, password: string) {
    return this.authenticationClient.send('validateUser', { identifier, password })
  }
}
