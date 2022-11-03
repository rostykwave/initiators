import { Body, Controller, Post } from '@nestjs/common';
import { CreateRecurringDto } from './dto/create-recurring.dto';
import { RecurringBooking } from './recurring-booking.entity';
import { RecurringBookingsService } from './recurring-bookings.service';

@Controller('recurring-bookings')
export class RecurringBookingsController {
  constructor(private recurringBookingsService: RecurringBookingsService) {}

  @Post()
  create(
    @Body() createRecurringDto: CreateRecurringDto,
  ): Promise<RecurringBooking> {
    return this.recurringBookingsService.create(createRecurringDto);
  }
}
