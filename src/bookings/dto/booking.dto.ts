// import { Account } from 'src/accounts/account.entity';
import { Room } from 'src/rooms/room.entity';

export class BookingDto {
  id: number;

  createdAt: Date;

  title: string;

  isRecurring: boolean;

  meetingDate: Date | string;

  startTime: Date;

  endTime: Date;

  room?: Room;

  guests?: any;

  owner?: any;

  // owner?: Account;

  // guests?: Account[];
}
