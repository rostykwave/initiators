// import { Account } from 'src/accounts/account.entity';
import { DaysOfWeek } from 'src/recurring-bookings/recurring-booking.entity';
import { Room } from 'src/rooms/room.entity';

export class BookingDto {
  id: number;

  createdAt: Date;

  title: string;

  isRecurring: boolean;

  meetingDate: Date | string;

  startTime: Date;

  endTime: Date;

  daysOfWeek: DaysOfWeek[] | null;

  startDate: Date | null;

  endDate: Date | null;

  room?: Room;

  guests?: any;

  owner?: any;

  // owner?: Account;

  // guests?: Account[];
}
