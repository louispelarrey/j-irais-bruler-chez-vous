import { Controller } from '@nestjs/common';
import { MailingService } from './mailing.service';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { SendMailDto } from './dto/send-mail.dto';

@Controller()
export class MailingController {
  constructor(private readonly mailingService: MailingService) {}

  /**
   * Message handler for sending an email.
   * @param {SendMailDto} sendMailDto - The data for sending the email.
   * @param {RmqContext} context - The RabbitMQ message context.
   * @returns {Promise<any>} A promise that resolves to the result of sending the email.
   */
  @MessagePattern('sendMail')
  async sendMail(@Payload() sendMailDto: SendMailDto, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    try {
      const result = await this.mailingService.sendMail(sendMailDto);

      // Acknowledge the message to remove it from the queue
      channel.ack(originalMsg);

      return result;
    } catch (error) {
      console.error(error);

      // Reject and requeue the message for further processing
      channel.nack(originalMsg);
    }
  }
}
