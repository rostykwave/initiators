import { Injectable } from '@nestjs/common';
import { sortOneTimeBookingsByTimeAndDate } from 'src/one-time-bookings/helpers/sort-one-time-bookings-by-time-and-date';
import { OneTimeBooking } from 'src/one-time-bookings/one-time-booking.entity';
import { OneTimeBookingsRepository } from 'src/one-time-bookings/one-time-bookings.repository';
import { reccurringBookingParsing } from 'src/recurring-bookings/helpers/reccurring-booking-parsing';
import { RecurringBookingsRepository } from 'src/recurring-bookings/recurring-bookings.repository';
import { IBookingsPagination } from './interfaces/bookings-pagination.interface';

@Injectable()
export class BookingsService {
  constructor(
    private readonly oneTimeBookingsRepository: OneTimeBookingsRepository,
    private readonly recurringBookingsRepository: RecurringBookingsRepository,
  ) {}

  async findAllOwnBookings(
    ownerId: number,
    page: number,
    limit: number,
  ): Promise<IBookingsPagination<OneTimeBooking>> {
    const allOwnOneTimeBookings =
      await this.oneTimeBookingsRepository.findAllByOwnerId(ownerId);

    const allOwnRecurringBookings =
      await this.recurringBookingsRepository.findAllByOwnerId(ownerId);
    const allOwnRecurringBookingsParsed = allOwnRecurringBookings.flatMap(
      (booking) => reccurringBookingParsing(booking),
    );

    const allBookings = [
      ...allOwnOneTimeBookings,
      ...allOwnRecurringBookingsParsed,
    ];

    const sortedAllBookings = sortOneTimeBookingsByTimeAndDate(allBookings);
    const paginatedAndSortedAllBookings = sortedAllBookings.slice(
      limit * (page - 1),
      page * limit,
    );

    return {
      bookings: paginatedAndSortedAllBookings,
      page,
      limit,
      totalCount: sortedAllBookings.length,
    };
  }
}
