import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateRecurringDto } from './dto/create-recurring.dto';
import { RecurringBooking } from './recurring-booking.entity';
import { RecurringBookingsService } from './recurring-bookings.service';

@Controller('recurring-bookings')
export class RecurringBookingsController {
  constructor(private recurringBookingsService: RecurringBookingsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() createRecurringDto: CreateRecurringDto,
    @Request() req,
  ): Promise<RecurringBooking> {
    const currentUserId = req.user.id;
    return this.recurringBookingsService.create(
      createRecurringDto,
      currentUserId,
    );
  }
}
