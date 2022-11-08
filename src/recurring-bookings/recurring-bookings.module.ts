import { Module } from '@nestjs/common';
import { RecurringBookingsService } from './recurring-bookings.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecurringBooking } from './recurring-booking.entity';
import { RecurringBookingsRepository } from './recurring-bookings.repository';
import { RoomsRepository } from 'src/rooms/rooms.repository';

@Module({
  imports: [TypeOrmModule.forFeature([RecurringBooking])],
  providers: [
    RecurringBookingsService,
    RecurringBookingsRepository,
    RoomsRepository,
  ],
  exports: [RecurringBookingsService],
})
export class RecurringBookingsModule {}
