import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(
    @Inject('AUTHENTICATION') private readonly authenticationClient: ClientProxy,
  ) {}

  getData() {
    this.authenticationClient.send('test', {username: "abc"}).subscribe((res) => {
      console.log(res);
    });
  }
}
