import { Body, Controller, Post } from '@nestjs/common';
import { MessageService } from './message.service';
import { Public } from '../authentication/decorators/public.decorator';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Public()
  @Post()
  async create(@Body() body: any) {
    return this.messageService.create(body);
  }

}
