import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AccountsModule } from './accounts/accounts.module';
import { RecurringBookingsModule } from './recurringBookings/recurringBookings.module';
import { GuestsModule } from './guests/guests.module';
import { OfficesModule } from './offices/offices.module';
import { RoomsModule } from './rooms/rooms.module';
import { AppDataSource } from 'ormconfig';
import { OneTimeBookingsModule } from './oneTimeBookings/oneTimeBookings.module';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { MailModule } from './email/email.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(AppDataSource.options),
    AccountsModule,
    OneTimeBookingsModule,
    RecurringBookingsModule,
    GuestsModule,
    RoomsModule,
    OfficesModule,
    AuthModule,
    AdminModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
