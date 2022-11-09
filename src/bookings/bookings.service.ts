import { Injectable } from '@nestjs/common';
import { sortBookingsByTimeAndDate } from 'src/one-time-bookings/helpers/sort-bookings-by-time-and-date';
import { OneTimeBookingsRepository } from 'src/one-time-bookings/one-time-bookings.repository';
import { RecurringBookingsRepository } from 'src/recurring-bookings/recurring-bookings.repository';
import { BookingsMapper } from './bookings.mapper';
import { BookingDto } from './dto/booking.dto';
import { IBookingsForCalendar } from './interfaces/bookings-for-calendar.interface';
import { IBookingsPagination } from './interfaces/bookings-pagination.interface';

@Injectable()
export class BookingsService {
  constructor(
    private readonly oneTimeBookingsRepository: OneTimeBookingsRepository,
    private readonly recurringBookingsRepository: RecurringBookingsRepository,
    private readonly bookingsMapper: BookingsMapper,
  ) {}

  async findAllBookingsForCalendar(
    roomId: number,
    officeId: number,
    startDate: string,
    endDate: string,
  ): Promise<IBookingsForCalendar<BookingDto>> {
    const allOneTimeBookingsForCalendar =
      await this.oneTimeBookingsRepository.findAllByDateAndLocation(
        roomId,
        officeId,
        startDate,
        endDate,
      );
    // const allRecurringTimeBookingsForCalendar =
    //   await this.recurringBookingsRepository.
    const allBookings = [
      ...this.bookingsMapper.mapOneTimeBookings(allOneTimeBookingsForCalendar),
      // ...this.bookingsMapper.mapRecurringBookings(allRecurringTimeBookingsForCalendar),
    ];
    const sortedAllBookings = sortBookingsByTimeAndDate(allBookings);

    return {
      data: {
        period: {
          startDate,
          endDate,
        },
        bookings: sortedAllBookings,
      },
    };
  }

  async findAllOwnBookings(
    ownerId: number,
    page: number,
    limit: number,
  ): Promise<IBookingsPagination<BookingDto>> {
    const allOwnOneTimeBookings =
      await this.oneTimeBookingsRepository.findAllByOwnerId(ownerId);

    const allOwnRecurringBookings =
      await this.recurringBookingsRepository.findAllByOwnerId(ownerId);

    const allBookings = [
      ...this.bookingsMapper.mapOneTimeBookings(allOwnOneTimeBookings),
      ...this.bookingsMapper.mapRecurringBookings(allOwnRecurringBookings),
    ];

    const sortedAllBookings = sortBookingsByTimeAndDate(allBookings);
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
