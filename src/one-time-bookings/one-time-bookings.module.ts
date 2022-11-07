import { Module } from '@nestjs/common';
import { OneTimeBookingsService } from './one-time-bookings.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OneTimeBooking } from './one-time-booking.entity';
import { OneTimeBookingsRepository } from './one-time-bookings.repository';
import { RoomsRepository } from 'src/rooms/rooms.repository';

@Module({
  imports: [TypeOrmModule.forFeature([OneTimeBooking])],
  providers: [OneTimeBookingsService, OneTimeBookingsRepository],
  exports: [OneTimeBookingsService],
})
export class OneTimeBookingsModule {}
