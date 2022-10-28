export const reccurringBookingToArrayOfSimpleBookings = (recurringBooking) => {
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

    if (recurringDaysOfWeek.includes(nextDayOfWeek)) {
      const booking = {
        // id: 3,
        createdAt: recurringBooking.createdAt,
        meetingDate: nextDate,
        startTime: '08:00:00',
        endTime: '09:00:00',
      };
      // simpleBookings.push(nextDate);
      simpleBookings.push(booking);
    }
  }

  console.log('simpleBookings', simpleBookings);
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
