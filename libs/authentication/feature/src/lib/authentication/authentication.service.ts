import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcryptjs';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { Users } from '@j-irais-bruler-chez-vous/user/feature'

@Injectable()
export class AuthenticationService {
  constructor(
    // private readonly userService: UserService,
    private readonly jwtService: JwtService,
    @Inject('USER') private readonly userClient: ClientProxy,
  ) { }

  async validateUser(identifier: string, pass: string): Promise<any |null>  {
    // const user = await this.userService.findByIdentifier(identifier);
    const user: Users = await lastValueFrom(this.userClient.send('findUserByIdentifier', identifier));
    if (user && await bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login({username}: {username: string}): Promise<{access_token: string}> {
    const user: Users = await lastValueFrom(this.userClient.send('findUserByIdentifier', username));
    const payload = {
      sub: user.id,
      username: user.username,
      roles: user.roles
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
