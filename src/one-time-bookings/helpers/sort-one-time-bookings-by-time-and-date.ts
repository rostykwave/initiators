import { OneTimeBooking } from '../one-time-booking.entity';

export const sortOneTimeBookingsByTimeAndDate = (
  oneTimeBookings: OneTimeBooking[],
) => {
  return oneTimeBookings.sort((a, b) => {
    return (
      new Date(`${a.meetingDate} ${a.startTime}`).getTime() -
      new Date(`${b.meetingDate} ${b.startTime}`).getTime()
    );
  });
};
