import { BookingDto } from 'src/bookings/dto/booking.dto';

export const sortBookingsByTimeAndDate = (bookingDto: BookingDto[]) => {
  return bookingDto.sort((a, b) => {
    return (
      new Date(`${a.meetingDate} ${a.startTime}`).getTime() -
      new Date(`${b.meetingDate} ${b.startTime}`).getTime()
    );
  });
};
