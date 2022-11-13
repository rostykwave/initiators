import { Injectable } from '@nestjs/common';
import { parseDateStringWithoutTime } from 'src/helpers/parse-date-string-without-time';
import { sortBookingsByTimeAndDate } from 'src/one-time-bookings/helpers/sort-bookings-by-time-and-date';
import { OneTimeBookingsRepository } from 'src/one-time-bookings/one-time-bookings.repository';
import { RecurringBookingsRepository } from 'src/recurring-bookings/recurring-bookings.repository';
import { BookingsMapper } from './bookings.mapper';
import { BookingDto } from './dto/booking.dto';
import { IBookingsInRange } from './interfaces/bookings-in-range.interface';
import { IBookingsPagination } from './interfaces/bookings-pagination.interface';

@Injectable()
export class BookingsService {
  constructor(
    private readonly oneTimeBookingsRepository: OneTimeBookingsRepository,
    private readonly recurringBookingsRepository: RecurringBookingsRepository,
    private readonly bookingsMapper: BookingsMapper,
  ) {}

  async findAllBookingsByOfficeIdInRange(
    officeId: number,
    startDate: Date,
    endDate: Date,
  ): Promise<IBookingsInRange<BookingDto>> {
    const allOneTimeBookings =
      await this.oneTimeBookingsRepository.findAllBookingsByOfficeIdInRange(
        officeId,
        startDate,
        endDate,
      );
    const allRecurringTimeBookings =
      await this.recurringBookingsRepository.findAllBookingsByOfficeIdInRange(
        officeId,
        startDate,
      );

    const allBookings = [
      ...this.bookingsMapper.mapOneTimeBookings(allOneTimeBookings),
      ...this.bookingsMapper.mapRecurringBookingsInRange(
        allRecurringTimeBookings,
        startDate,
        endDate,
      ),
    ];
    const sortedAllBookings = sortBookingsByTimeAndDate(allBookings);

    return {
      data: {
        period: {
          startDate: parseDateStringWithoutTime(startDate),
          endDate: parseDateStringWithoutTime(endDate),
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
      data: {
        bookings: paginatedAndSortedAllBookings,
        page,
        limit,
        totalCount: sortedAllBookings.length,
      },
    };
  }
}
