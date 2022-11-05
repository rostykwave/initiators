import { Module } from '@nestjs/common';
import { OneTimeBookingsModule } from 'src/one-time-bookings/one-time-bookings.module';
import { BookingsController } from './bookings.controller';

@Module({
  imports: [OneTimeBookingsModule],
  controllers: [BookingsController],
})
export class BookingsModule {}
