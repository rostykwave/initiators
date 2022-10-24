import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as SendGrid from '@sendgrid/mail';
import { INVITE_USER_EMAIL_HTML } from './constants/sendgridEmail.constants';
import { IEmailData } from './interfaces/email.interface';

@Injectable()
export class SendgridEmailService {
  private readonly from = this.configService.get<string>('SEND_GRID_EMAIL');

  constructor(private readonly configService: ConfigService) {
    SendGrid.setApiKey(this.configService.get<string>('SEND_GRID_KEY'));
  }

  async sendInvitationEmail(email: string, password: string) {
    const mail: IEmailData = {
      to: email,
      subject: 'Welcome to Incora',
      from: this.from,
      html: INVITE_USER_EMAIL_HTML(email, password),
    };

    await SendGrid.send(mail);
  }
}
