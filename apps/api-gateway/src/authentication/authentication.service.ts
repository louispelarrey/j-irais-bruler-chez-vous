import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AuthenticationService {
  /**
   * Create an instance of AuthenticationService.
   * @param authenticationClient - The client proxy for authentication microservice.
   */
  public constructor(
    @Inject('AUTHENTICATION') private readonly authenticationClient: ClientProxy,
  ){}

  /**
   * Sends a login request to the authentication microservice.
   * @param username - The username to authenticate.
   * @returns A promise that resolves to the user information if the login is successful.
   */
  getLogin(username: string, password: string) {
    return this.authenticationClient.send('login', {username, password})
  }

  /**
   * Validates a user's identifier and password with the authentication microservice.
   * @param identifier - The user identifier (e.g., username or email).
   * @param password - The user's password.
   * @returns A promise that resolves to the validated user information if successful, or throws an exception if validation fails.
   */
  validateUser(identifier: string, password: string) {
    return this.authenticationClient.send('validateUser', { identifier, password })
  }
}
