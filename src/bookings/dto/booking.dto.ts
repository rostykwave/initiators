import { GuestDto } from 'src/guests/dto/guest.dto';
import { DaysOfWeek } from 'src/recurring-bookings/recurring-booking.entity';
import { Room } from 'src/rooms/room.entity';
import { OwnerDto } from './owner.dto';

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

  room: Room;

  guests: GuestDto[];

  owner: OwnerDto;
}
