import { Module } from '@nestjs/common';
import { RecurringBookingsService } from './recurring-bookings.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecurringBooking } from './recurring-booking.entity';
import { RecurringBookingsRepository } from './recurring-bookings.repository';
import { RoomsRepository } from 'src/rooms/rooms.repository';
import { GuestsModule } from 'src/guests/guests.module';
import { AccountsModule } from 'src/accounts/accounts.module';
import { OneTimeBookingsRepository } from 'src/one-time-bookings/one-time-bookings.repository';
import { BookingsMapper } from 'src/bookings/bookings.mapper';

@Module({
  imports: [
    TypeOrmModule.forFeature([RecurringBooking]),
    GuestsModule,
    AccountsModule,
  ],
  providers: [
    RecurringBookingsService,
    RecurringBookingsRepository,
    OneTimeBookingsRepository,
    RoomsRepository,
    BookingsMapper,
  ],
  exports: [RecurringBookingsService],
})
export class RecurringBookingsModule {}
