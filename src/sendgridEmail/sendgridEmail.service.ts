import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as SendGrid from '@sendgrid/mail';
import {
  INVITE_USER_EMAIL_HTML,
  RESET_PASSWORD_HTML,
} from './constants/sendgridEmail.constants';
import { IEmailData } from './interfaces/email.interface';

@Injectable()
export class SendgridEmailService {
  private readonly from = this.configService.get<string>('SEND_GRID_EMAIL');
  private readonly registrationLink = this.configService.get<string>(
    'INVITE_USER_REGISTRATION_LINK',
  );
  private readonly resetPasswordLink = this.configService.get<string>(
    'RESET_PASSWORD_LINK',
  );

  constructor(private readonly configService: ConfigService) {
    SendGrid.setApiKey(this.configService.get<string>('SEND_GRID_KEY'));
  }

  async sendInvitationEmail(email: string, password: string) {
    const mail: IEmailData = {
      to: email,
      subject: 'Welcome to Incora',
      from: this.from,
      html: INVITE_USER_EMAIL_HTML(
        email,
        password,
        `${this.registrationLink}${email}`,
      ),
    };

    await SendGrid.send(mail);
  }

  async sendResetPasswordEmail(email: string, password: string) {
    const mail: IEmailData = {
      to: email,
      subject: 'Reset password Incora Booking App',
      from: this.from,
      html: RESET_PASSWORD_HTML(
        email,
        password,
        `${this.resetPasswordLink}${email}`,
      ),
    };

    await SendGrid.send(mail);
  }
}
