import { Controller, Get } from '@nestjs/common';
import { Public } from '../authentication/decorators/public.decorator';

@Controller()
export class AppController {

  @Get()
  @Public()
  health(): boolean {
    return true;
  }
}
