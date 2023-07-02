import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthenticationService } from '../authentication.service';
// import { Users } from '@api-user/user/users.entity';
import { Users } from '@j-irais-bruler-chez-vous/user/feature'
import { lastValueFrom } from 'rxjs';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

  /**
   * Creates an instance of LocalStrategy.
   * @param authService - The AuthenticationService instance.
   */
  constructor(private authService: AuthenticationService) {
    super();
  }

  /**
   * Validates the user's credentials.
   * @param identifier - The user identifier (e.g., username or email).
   * @param password - The user's password.
   * @returns The validated user information or throws an UnauthorizedException if validation fails.
   */
  async validate(identifier: string, password: string): Promise<Users | UnauthorizedException>  {
    const user = await lastValueFrom(this.authService.validateUser(identifier, password));
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
