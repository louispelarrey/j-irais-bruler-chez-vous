import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  /**
   * Creates an instance of JwtStrategy.
   * @param configService - The ConfigService instance.
   */
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  /**
   * Validates the JWT payload.
   * @param payload - The JWT payload.
   * @returns The validated user information.
   */
  async validate(payload: { sub: string; username: string; roles: string[]}) {
    return { sub: payload.sub, username: payload.username, roles: payload.roles };
  }
}
