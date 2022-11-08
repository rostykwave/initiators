import { Room } from 'src/rooms/room.entity';

export class BookingDto {
  createdAt: Date;

  isRecurring: boolean;

  meetingDate: Date;

  startTime: Date;

  endTime: Date;

  room?: Room;
}
