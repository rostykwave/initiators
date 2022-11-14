import { Module } from '@nestjs/common';
import { RecurringBookingsService } from './recurring-bookings.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecurringBooking } from './recurring-booking.entity';
import { RecurringBookingsRepository } from './recurring-bookings.repository';
import { RoomsRepository } from 'src/rooms/rooms.repository';
import { BookingsMapper } from 'src/bookings/bookings.mapper';
import { OneTimeBookingsRepository } from 'src/one-time-bookings/one-time-bookings.repository';

@Module({
  imports: [TypeOrmModule.forFeature([RecurringBooking])],
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
