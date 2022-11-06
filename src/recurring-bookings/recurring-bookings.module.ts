import { Module } from '@nestjs/common';
import { RecurringBookingsService } from './recurring-bookings.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecurringBooking } from './recurring-booking.entity';
import { RecurringBookingsRepository } from './recurring-bookings.repository';

@Module({
  imports: [TypeOrmModule.forFeature([RecurringBooking])],
  providers: [RecurringBookingsService, RecurringBookingsRepository],
  exports: [RecurringBookingsService],
})
export class RecurringBookingsModule {}
