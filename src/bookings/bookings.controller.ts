import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { OneTimeBookingDto } from 'src/one-time-bookings/dto/one-time-booking.dto';
import { OneTimeBooking } from 'src/one-time-bookings/one-time-booking.entity';
import { OneTimeBookingsService } from 'src/one-time-bookings/one-time-bookings.service';
import { RecurringBookingDto } from 'src/recurring-bookings/dto/recurring-booking.dto';
import { RecurringBooking } from 'src/recurring-bookings/recurring-booking.entity';
import { RecurringBookingsService } from 'src/recurring-bookings/recurring-bookings.service';

@Controller('bookings')
@UseGuards(JwtAuthGuard)
export class BookingsController {
  constructor(
    private readonly oneTimeBookingsService: OneTimeBookingsService,
    private readonly recurringBookingsService: RecurringBookingsService,
  ) {}

  @Post('one-time')
  createOneTimeBooking(
    @Body() oneTimeBookingDto: OneTimeBookingDto,
    @Request() req,
  ): Promise<OneTimeBooking> {
    return this.oneTimeBookingsService.create(oneTimeBookingDto, req.user.id);
  }

  @Post('recurring')
  createRecurringBooking(
    @Body() recurringBookingDto: RecurringBookingDto,
    @Request() req,
  ): Promise<RecurringBooking> {
    return this.recurringBookingsService.create(
      recurringBookingDto,
      req.user.id,
    );
  }
}
