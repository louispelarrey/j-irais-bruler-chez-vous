import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { Users } from '@j-irais-bruler-chez-vous/user/feature'

interface LoginResponse {
  access_token: string;
  refresh_token: string;
}

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

  async login(username: string, password: string): Promise<LoginResponse | null> {
    const user: Users = await this.validateUser(username, password);
    
    if(user) {
      const payload = {
        sub: user.id,
        username: user.username,
        roles: user.roles
      };
      return {
        access_token: this.jwtService.sign(payload),
        refresh_token: this.jwtService.sign(payload, { expiresIn: '7d' }),
      };
    }

    return null;
  }
}
