import { addDaysToDate } from 'src/helpers/add-days-to-date';
import { parseDateStringWithoutTime } from 'src/helpers/parse-date-string-without-time';
import { OneTimeBooking } from 'src/one-time-bookings/one-time-booking.entity';
import { RecurringBooking } from 'src/recurring-bookings/recurring-booking.entity';
import { BookingDto } from './dto/booking.dto';

export class BookingsMapper {
  constructor() {}

  mapOneTimeBookings(oneTimeBookings: OneTimeBooking[]): BookingDto[] {
    return oneTimeBookings.map((oneTimeBooking) => {
      const bookingDto = new BookingDto();
      bookingDto.id = oneTimeBooking.id;
      bookingDto.createdAt = oneTimeBooking.createdAt;
      bookingDto.isRecurring = false;
      bookingDto.meetingDate = oneTimeBooking.meetingDate;
      bookingDto.startTime = oneTimeBooking.startTime;
      bookingDto.endTime = oneTimeBooking.endTime;
      bookingDto.room = oneTimeBooking.room;

      return bookingDto;
    });
  }

  mapRecurringBookings(recurringBookings: RecurringBooking[]): BookingDto[] {
    return recurringBookings.flatMap((recurringBooking) => {
      const today = new Date(parseDateStringWithoutTime(new Date()));

      const startDate = new Date(recurringBooking.startDate);
      const endDate = new Date(recurringBooking.endDate);
      const daysBetweenStartAndEndDate =
        (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24);

      const mappedBookings = [];

      for (let i = 0; i < daysBetweenStartAndEndDate; i++) {
        const nextDate = addDaysToDate(startDate, i);
        const nextDayOfWeek = nextDate.getDay();

        if (
          recurringBooking.daysOfWeek.includes(nextDayOfWeek) &&
          nextDate.getTime() >= today.getTime()
        ) {
          const bookingDto = new BookingDto();
          bookingDto.id = recurringBooking.id;
          bookingDto.createdAt = recurringBooking.createdAt;
          bookingDto.isRecurring = true;
          bookingDto.meetingDate = parseDateStringWithoutTime(nextDate);
          bookingDto.startTime = recurringBooking.startTime;
          bookingDto.endTime = recurringBooking.endTime;
          bookingDto.room = recurringBooking.room;
          mappedBookings.push(bookingDto);

          // const booking = {
          //   id: recurringBooking.id,
          //   createdAt: recurringBooking.createdAt,
          //   isRecurring: true,
          //   meetingDate: parseDateStringWithoutTime(nextDate),
          //   startTime: recurringBooking.startTime,
          //   endTime: recurringBooking.endTime,
          //   room: recurringBooking.room,
          // };
          // mappedBookings.push(booking);
        }
      }
      return mappedBookings;
    });
  }

  mapRecurringBookingsInRange(
    recurringBookings: RecurringBooking[],
    startDate: string,
    endDate: string,
  ): BookingDto[] {
    const allMappedRecurringBookings =
      this.mapRecurringBookings(recurringBookings);

    const inRange = allMappedRecurringBookings.filter((b) => {
      if (
        new Date(b.meetingDate).getTime() >= new Date(startDate).getTime() &&
        new Date(b.meetingDate).getTime() <= new Date(endDate).getTime()
      ) {
        return b;
      }
    });

    return inRange;
  }
}
