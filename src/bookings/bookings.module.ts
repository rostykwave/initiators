import { Module } from '@nestjs/common';
import { OneTimeBookingsModule } from 'src/one-time-bookings/one-time-bookings.module';
import { RecurringBookingsModule } from 'src/recurring-bookings/recurring-bookings.module';
import { RoomsModule } from 'src/rooms/rooms.module';
import { BookingsController } from './bookings.controller';

@Module({
  imports: [OneTimeBookingsModule, RecurringBookingsModule, RoomsModule],
  controllers: [BookingsController],
})
export class BookingsModule {}
