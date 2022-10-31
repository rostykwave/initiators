import { RecurringBooking } from 'src/recurringBookings/recurringBooking.entity';
import { v4 as uuidv4 } from 'uuid';
import { addDaysToDate } from './addDaysToDate';
import { todaysLocaleDateString } from './todaysLocaleDateString';

export const reccurringBookingToArrayOfSimpleBookings = (
  recurringBooking: RecurringBooking,
  soonestBookingsDays: number,
) => {
  const today = new Date(todaysLocaleDateString());
  const endOfPeriodDate = addDaysToDate(new Date(), soonestBookingsDays);

  const startDate = new Date(recurringBooking.startDate);
  const endDate = new Date(recurringBooking.endDate);
  const daysBetweenStartAndEndDate =
    (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24);

  const simpleBookings = [];
  const recurringDaysOfWeek = daysArrayNameToNumberOfWeek(
    recurringBooking.daysOfWeek,
  );

  for (let i = 0; i < daysBetweenStartAndEndDate; i++) {
    const nextDate = addDaysToDate(startDate, i);
    const nextDayOfWeek = nextDate.getDay();

    if (
      recurringDaysOfWeek.includes(nextDayOfWeek) &&
      nextDate.getTime() >= today.getTime() &&
      nextDate.getTime() <= endOfPeriodDate.getTime()
    ) {
      const booking = {
        id: uuidv4(),
        generatedFromRecurrentBookingWithId: recurringBooking.id,
        createdAt: recurringBooking.createdAt,
        meetingDate: nextDate.toJSON().split('T')[0],
        startTime: recurringBooking.startTime,
        endTime: recurringBooking.endTime,
      };
      simpleBookings.push(booking);
    }
  }
  return simpleBookings;
};

//additional helper func
function daysArrayNameToNumberOfWeek(recurringDaysOfWeek) {
  const result = recurringDaysOfWeek.map((day) => {
    switch (day) {
      case 'Monday':
        return 1;
      case 'Tuesday':
        return 2;
      case 'Wednesday':
        return 3;
      case 'Thursday':
        return 4;
      case 'Friday':
        return 5;
      case 'Saturday':
        return 6;
      case 'Sunday':
        return 7;

      default:
        return null;
    }
  });
  return result;
}
