import { Room } from 'src/rooms/room.entity';

export class BookingDto {
  id: number;

  createdAt: Date;

  isRecurring: boolean;

  meetingDate: Date | string;

  startTime: Date;

  endTime: Date;

  room?: Room;
}
