import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { BookingService } from './booking.service';
// import { BookingController } from './booking.controller';
import { Booking } from './booking.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Booking])],
  // providers: [BookingService],
  // controllers: [BookingController],
})
export class BookingsModule {}
