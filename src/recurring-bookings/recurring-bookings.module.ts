import { Module } from '@nestjs/common';
import { RecurringBookingsService } from './recurring-bookings.service';
import { RecurringBookingsController } from './recurring-bookings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecurringBooking } from './recurring-booking.entity';
import { RecurringBookingsRepository } from './recurring-bookings.repository';

@Module({
  imports: [TypeOrmModule.forFeature([RecurringBooking])],
  providers: [RecurringBookingsService, RecurringBookingsRepository],
  controllers: [RecurringBookingsController],
})
export class RecurringBookingsModule {}
