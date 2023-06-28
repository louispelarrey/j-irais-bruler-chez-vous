import { Controller } from '@nestjs/common';
import { MailingService } from './mailing.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SendMailDto } from './dto/send-mail.dto';

@Controller()
export class MailingController {
  constructor(private readonly mailingService: MailingService) {}

  @MessagePattern('sendMail')
  async sendMail(@Payload() sendMailDto: SendMailDto) {
    return this.mailingService.sendMail(sendMailDto);
  }
}
