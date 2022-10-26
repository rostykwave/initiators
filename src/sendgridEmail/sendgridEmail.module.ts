import { Module } from '@nestjs/common';
import { SendgridEmailService } from './sendgridEmail.service';

@Module({
  providers: [SendgridEmailService],
  exports: [SendgridEmailService],
})
export class sendgridEmailModule {}
