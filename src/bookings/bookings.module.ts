import { Module } from '@nestjs/common';
import { GuestsModule } from 'src/guests/guests.module';
import { OneTimeBookingsModule } from 'src/one-time-bookings/one-time-bookings.module';
import { OneTimeBookingsRepository } from 'src/one-time-bookings/one-time-bookings.repository';
import { RecurringBookingsModule } from 'src/recurring-bookings/recurring-bookings.module';
import { RecurringBookingsRepository } from 'src/recurring-bookings/recurring-bookings.repository';
import { BookingsController } from './bookings.controller';
import { BookingsMapper } from './bookings.mapper';
import { BookingsService } from './bookings.service';

@Module({
  imports: [OneTimeBookingsModule, RecurringBookingsModule, GuestsModule],
  controllers: [BookingsController],
  providers: [
    BookingsService,
    OneTimeBookingsRepository,
    RecurringBookingsRepository,
    BookingsMapper,
  ],
})
export class BookingsModule {}
