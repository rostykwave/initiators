import { Body, Controller, Post } from '@nestjs/common';
import { CreateOneTimeDto } from './dto/create-one-time.dto';
import { OneTimeBooking } from './one-time-booking.entity';
import { OneTimeBookingsService } from './one-time-bookings.service';

@Controller('one-time-bookings')
export class OneTimeBookingsController {
  constructor(private oneTimeBookingsService: OneTimeBookingsService) {}

  @Post()
  // create(@Body() createOneTimeDto: CreateOneTimeDto): void {
  create(@Body() createOneTimeDto: CreateOneTimeDto): Promise<OneTimeBooking> {
    // console.log('createOneTimeDto', createOneTimeDto);
    return this.oneTimeBookingsService.create(createOneTimeDto);
  }
}
