import { Injectable } from '@nestjs/common';
import { SendMailDto } from './dto/send-mail.dto';
import { Resend } from 'resend';

@Injectable()
export class MailingService {
  private readonly resend = new Resend(process.env.RESEND_API_KEY);

  /**
   * Sends an email using the provided data.
   * @param {SendMailDto} sendMailDto - The data for sending the email.
   * @returns {Promise<void>} A promise that resolves when the email is sent successfully.
   */
  async sendMail(sendMailDto: SendMailDto) {
    try {
      const data = await this.resend.emails.send({
        from: 'noreply@j-irais-bruler-chez-vous.com',
        to: sendMailDto.to,
        subject: sendMailDto.subject,
        html: sendMailDto.text,
      });
    } catch (e) {
      console.log(e);
    }
  }
}
