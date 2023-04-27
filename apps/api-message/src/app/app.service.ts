import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

  create(data: any) {
    return {message: 'Message created', data}
  }

}
