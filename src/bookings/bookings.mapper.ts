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
      bookingDto.title = oneTimeBooking.title;
      bookingDto.isRecurring = false;
      bookingDto.meetingDate = oneTimeBooking.meetingDate;
      bookingDto.startTime = oneTimeBooking.startTime;
      bookingDto.endTime = oneTimeBooking.endTime;
      bookingDto.daysOfWeek = null;
      bookingDto.startDate = null;
      bookingDto.endDate = null;
      bookingDto.room = oneTimeBooking.room;
      //removing guests password
      if (oneTimeBooking.guests) {
        bookingDto.guests = oneTimeBooking.guests.map((g) => {
          const { guest } = g;
          const { password, ...guestRest } = guest;
          return guestRest;
        });
      }

      //removing owner password
      if (oneTimeBooking.owner) {
        const { password, ...ownerRest } = oneTimeBooking.owner;
        bookingDto.owner = ownerRest;
      }

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
          bookingDto.title = recurringBooking.title;
          bookingDto.isRecurring = true;
          bookingDto.meetingDate = parseDateStringWithoutTime(nextDate);
          bookingDto.startTime = recurringBooking.startTime;
          bookingDto.endTime = recurringBooking.endTime;
          bookingDto.daysOfWeek = recurringBooking.daysOfWeek;
          bookingDto.startDate = recurringBooking.startDate;
          bookingDto.endDate = recurringBooking.endDate;
          bookingDto.room = recurringBooking.room;

          //removing guests password
          if (recurringBooking.guests) {
            bookingDto.guests = recurringBooking.guests.map((g) => {
              const { guest } = g;
              const { password, ...guestRest } = guest;
              return guestRest;
            });
          }

          //removing owner password
          if (recurringBooking.owner) {
            const { password, ...ownerRest } = recurringBooking.owner;
            bookingDto.owner = ownerRest;
          }

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
    startDate: Date,
    endDate: Date,
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
