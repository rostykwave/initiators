import { Injectable } from '@nestjs/common';
import { SendgridEmailService } from '../sendgridEmail/sendgridEmail.service';

@Injectable()
export class EmailService {
  constructor(private sendgridEmailService: SendgridEmailService) {}

  async sendInvitationEmail(email: string, password: string) {
    this.sendgridEmailService.sendInvitationEmail(email, password);
  }

  async sendResetPasswordEmail(email: string, password: string) {
    this.sendgridEmailService.sendResetPasswordEmail(email, password);
  }
}
