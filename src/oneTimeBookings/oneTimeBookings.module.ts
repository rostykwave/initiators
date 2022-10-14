import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { OneTimeBookingService } from './OneTimeBooking.service';
// import { OneTimeBookingController } from './OneTimeBooking.controller';
import { OneTimeBooking } from './oneTimeBooking.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OneTimeBooking])],
  // providers: [OneTimeBookingService],
  // controllers: [OneTimeBookingController],
})
export class OneTimeBookingsModule {}
