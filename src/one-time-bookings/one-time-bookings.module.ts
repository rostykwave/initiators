import { Module } from '@nestjs/common';
import { OneTimeBookingsService } from './one-time-bookings.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OneTimeBooking } from './one-time-booking.entity';
import { OneTimeBookingsRepository } from './one-time-bookings.repository';
import { RoomsRepository } from 'src/rooms/rooms.repository';
import { RecurringBookingsRepository } from 'src/recurring-bookings/recurring-bookings.repository';
import { BookingsMapper } from 'src/bookings/bookings.mapper';

@Module({
  imports: [TypeOrmModule.forFeature([OneTimeBooking])],
  providers: [
    OneTimeBookingsService,
    OneTimeBookingsRepository,
    RecurringBookingsRepository,
    RoomsRepository,
    BookingsMapper,
  ],
  exports: [OneTimeBookingsService],
})
export class OneTimeBookingsModule {}
