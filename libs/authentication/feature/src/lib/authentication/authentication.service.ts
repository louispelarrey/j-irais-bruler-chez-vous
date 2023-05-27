import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { Users } from '@j-irais-bruler-chez-vous/user/feature'

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject('USER') private readonly userClient: ClientProxy,
  ) { }

  async validateUser(identifier: string, pass: string): Promise<Users |null>  {
    if(identifier === "" || pass === "") return null;

    const user: Users = await lastValueFrom(this.userClient.send('findUserByIdentifier', identifier));
    if (user && await bcrypt.compare(pass, user.password)) {
      return user;
    }
    return null;
  }

  async login(username: string): Promise<{access_token: string} | null> {
    if(username === "") return null;

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
