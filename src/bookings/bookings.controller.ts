import {
  Controller,
  Get,
  UseGuards,
  Request,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { OneTimeBooking } from 'src/one-time-bookings/one-time-booking.entity';
import { OneTimeBookingsService } from 'src/one-time-bookings/one-time-bookings.service';
import { RecurringBooking } from 'src/recurring-bookings/recurring-booking.entity';
import { RecurringBookingsService } from 'src/recurring-bookings/recurring-bookings.service';

@Controller('bookings')
@UseGuards(JwtAuthGuard)
export class BookingsController {
  constructor(
    private readonly oneTimeBookingsService: OneTimeBookingsService,
    private readonly recurringBookingsService: RecurringBookingsService,
  ) {}

  @Get('one-time/own')
  async findAllOneTimeBookings(
    @Request() req,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(1), ParseIntPipe) limit: number,
  ): Promise<Pagination<OneTimeBooking>> {
    const options: IPaginationOptions = {
      page,
      limit,
    };
    return this.oneTimeBookingsService.findAllPaginate(req.user.id, options);
  }

  @Get('recurring/own')
  async findAllRecurringBookings(
    @Request() req,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(1), ParseIntPipe) limit: number,
  ): Promise<Pagination<RecurringBooking>> {
    const options: IPaginationOptions = {
      page,
      limit,
    };
    return this.recurringBookingsService.findAllPaginate(req.user.id, options);
  }
}
