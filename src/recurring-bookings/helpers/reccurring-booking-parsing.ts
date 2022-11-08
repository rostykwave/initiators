import { addDaysToDate } from '../../helpers/add-days-to-date';
import { parseDateStringWithoutTime } from '../../helpers/parse-date-string-without-time';
import { RecurringBooking } from '../recurring-booking.entity';

const reccurringBookingParsing = (recurringBooking: RecurringBooking) => {
  const today = new Date(parseDateStringWithoutTime(new Date()));

  const startDate = new Date(recurringBooking.startDate);
  const endDate = new Date(recurringBooking.endDate);
  const daysBetweenStartAndEndDate =
    (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24);

  const parsedBookings = [];

  for (let i = 0; i < daysBetweenStartAndEndDate; i++) {
    const nextDate = addDaysToDate(startDate, i);
    const nextDayOfWeek = nextDate.getDay();

    if (
      recurringBooking.daysOfWeek.includes(nextDayOfWeek) &&
      nextDate.getTime() >= today.getTime()
    ) {
      const booking = {
        id: recurringBooking.id,
        createdAt: recurringBooking.createdAt,
        isRecurring: true,
        meetingDate: parseDateStringWithoutTime(nextDate),
        startTime: recurringBooking.startTime,
        endTime: recurringBooking.endTime,
        room: recurringBooking.room,
      };
      parsedBookings.push(booking);
    }
  }
  return parsedBookings;
};
