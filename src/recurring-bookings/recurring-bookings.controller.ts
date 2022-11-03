import { Controller } from '@nestjs/common';
import { RecurringBookingsService } from './recurring-bookings.service';

@Controller('recurring-bookings')
export class RecurringBookingsController {
  constructor(private recurringBookingsService: RecurringBookingsService) {}
}
