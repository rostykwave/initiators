import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AccountsModule } from './accounts/accounts.module';
import { OneTimeBookingsModule } from './one-time-bookings/one-time-bookings.module';
import { RecurringBookingsModule } from './recurring-bookings/recurring-bookings.module';
import { GuestsModule } from './guests/guests.module';
import { OfficesModule } from './offices/offices.module';
import { RoomsModule } from './rooms/rooms.module';
import { AppDataSource } from 'ormconfig';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { MailModule } from './email/email.module';
import { BookingsController } from './bookings/bookings.controller';
import { BookingsModule } from './bookings/bookings.module';

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
    BookingsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
