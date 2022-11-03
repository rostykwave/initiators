import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateOneTimeDto } from './dto/create-one-time.dto';
import { OneTimeBooking } from './one-time-booking.entity';
import { OneTimeBookingsService } from './one-time-bookings.service';

@Controller('one-time-bookings')
export class OneTimeBookingsController {
  constructor(private oneTimeBookingsService: OneTimeBookingsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() createOneTimeDto: CreateOneTimeDto,
    @Request() req,
  ): Promise<OneTimeBooking> {
    const currentUserId = req.user.id;
    return this.oneTimeBookingsService.create(createOneTimeDto, currentUserId);
  }
}
