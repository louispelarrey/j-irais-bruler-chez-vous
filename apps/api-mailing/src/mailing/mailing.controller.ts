import { Controller } from '@nestjs/common';
import { MailingService } from './mailing.service';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { SendMailDto } from './dto/send-mail.dto';

@Controller()
export class MailingController {
  constructor(private readonly mailingService: MailingService) {}

  @MessagePattern('sendMail')
  async sendMail(@Payload() sendMailDto: SendMailDto, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    try {
      const result = await this.mailingService.sendMail(sendMailDto);

      channel.ack(originalMsg);

      return result;
    } catch (error) {
      console.error(error);

      channel.nack(originalMsg);
    }
  }
}
