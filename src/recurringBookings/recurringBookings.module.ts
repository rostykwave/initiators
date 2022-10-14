import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { RecurringBookingService } from './RecurringBooking.service';
// import { RecurringBookingController } from './RecurringBooking.controller';
import { RecurringBooking } from './recurringBooking.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RecurringBooking])],
  // providers: [RecurringBookingService],
  // controllers: [RecurringBookingController],
})
export class RecurringBookingsModule {}
