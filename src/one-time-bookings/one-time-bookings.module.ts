import { Module } from '@nestjs/common';
import { OneTimeBookingsService } from './one-time-bookings.service';
import { OneTimeBookingsController } from './one-time-bookings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OneTimeBooking } from './one-time-booking.entity';
import { OneTimeBookingsRepository } from './one-time-bookings.repository';

@Module({
  imports: [TypeOrmModule.forFeature([OneTimeBooking])],
  providers: [OneTimeBookingsService, OneTimeBookingsRepository],
  controllers: [OneTimeBookingsController],
})
export class OneTimeBookingsModule {}
