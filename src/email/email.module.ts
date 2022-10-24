import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { sendgridEmailModule } from 'src/sendgridEmail/sendgridEmail.module';
import { SendgridEmailService } from 'src/sendgridEmail/sendgridEmail.service';

@Module({
  imports: [sendgridEmailModule],
  providers: [EmailService, SendgridEmailService],
  exports: [EmailService, SendgridEmailService],
})
export class MailModule {}
