import { Injectable } from '@nestjs/common';
import { sortOneTimeBookingsByTimeAndDate } from 'src/one-time-bookings/helpers/sort-one-time-bookings-by-time-and-date';
import { OneTimeBooking } from 'src/one-time-bookings/one-time-booking.entity';
import { OneTimeBookingsRepository } from 'src/one-time-bookings/one-time-bookings.repository';
import { reccurringBookingParsing } from 'src/recurring-bookings/helpers/reccurring-booking-parsing';
import { RecurringBooking } from 'src/recurring-bookings/recurring-booking.entity';
import { RecurringBookingsRepository } from 'src/recurring-bookings/recurring-bookings.repository';

@Injectable()
export class BookingsService {
  constructor(
    private readonly oneTimeBookingsRepository: OneTimeBookingsRepository,
    private readonly recurringBookingsRepository: RecurringBookingsRepository,
  ) {}

  async findAllOwnBookings(ownerId: number): Promise<OneTimeBooking[]> {
    const allOwnRecurringBookings =
      await this.recurringBookingsRepository.findAllByOwnerId(ownerId);

    const allOwnRecurringBookingsParsed = allOwnRecurringBookings.flatMap(
      (booking) => reccurringBookingParsing(booking),
    );

    const sorted = sortOneTimeBookingsByTimeAndDate(
      allOwnRecurringBookingsParsed,
    );

    return sorted;
    // return allOwnRecurringBookingsParsed;
    // return this.oneTimeBookingsRepository.findAllByOwnerId(ownerId);
  }
}
