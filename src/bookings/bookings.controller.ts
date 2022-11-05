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

@Controller('bookings')
export class BookingsController {
  constructor(private oneTimeBookingsService: OneTimeBookingsService) {}

  @UseGuards(JwtAuthGuard)
  @Get('one-time/own')
  async findAllByOwnerId(
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
}
