import { addDaysToDate } from './addDaysToDate';

export const reccurringBookingToArrayOfSimpleBookings = (
  recurringBooking,
  soonestBookingsDays,
) => {
  const today = new Date(new Date().toJSON().slice(0, 10));
  const endDateQuery = addDaysToDate(new Date(), soonestBookingsDays);
  const startDate = new Date(recurringBooking.startDate);
  const endDate = new Date(recurringBooking.endDate);
  const Difference_In_Time = endDate.getTime() - startDate.getTime();
  const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
  const simpleBookings = [];
  const recurringDaysOfWeek = daysArrayNameToNumberOfWeek(
    recurringBooking.daysOfWeek,
  );

  for (let i = 0; i < Difference_In_Days; i++) {
    const nextDate = new Date(
      new Date(startDate).setDate(startDate.getDate() + i),
    );
    const nextDayOfWeek = nextDate.getDay();

    if (
      recurringDaysOfWeek.includes(nextDayOfWeek) &&
      nextDate.getTime() >= today.getTime() &&
      nextDate.getTime() <= endDateQuery.getTime()
    ) {
      const booking = {
        id: `recurrent ${recurringBooking.id}`,
        // type: 'recurrent',
        createdAt: recurringBooking.createdAt,
        meetingDate: nextDate.toJSON().slice(0, 10),
        startTime: '08:00:00',
        endTime: '09:00:00',
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
