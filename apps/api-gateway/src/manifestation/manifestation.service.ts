import {Inject, Injectable} from "@nestjs/common";
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';


@Injectable()
export class ManifestationService {
  constructor(
    @Inject('MANIFESTATION') private readonly manifestationClient: ClientProxy,
    @Inject('USER') private readonly userClient: ClientProxy,
  ){}

  async findAll() {
    const test = await lastValueFrom(this.manifestationClient.send('findAll', { test: 'test'}));
    console.log('api-gateway',test);
    return test;
  }
}
