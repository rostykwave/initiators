import { Injectable } from '@nestjs/common';
import { Account } from 'src/accounts/account.entity';
import { Room } from 'src/rooms/room.entity';
import { CreateRecurringDto } from './dto/create-recurring.dto';
import { RecurringBooking } from './recurring-booking.entity';
import { RecurringBookingsRepository } from './recurring-bookings.repository';

@Injectable()
export class RecurringBookingsService {
  constructor(
    private readonly recurringBookingsRepository: RecurringBookingsRepository,
  ) {}

  async create(
    createRecurringDto: CreateRecurringDto,
    currentUserId: number,
  ): Promise<RecurringBooking> {
    const recurringBooking = new RecurringBooking();
    recurringBooking.createdAt = createRecurringDto.createdAt;
    recurringBooking.startDate = createRecurringDto.startDate;
    recurringBooking.endDate = createRecurringDto.endDate;
    recurringBooking.startTime = createRecurringDto.startTime;
    recurringBooking.endTime = createRecurringDto.endTime;
    recurringBooking.daysOfWeek = createRecurringDto.daysOfWeek;

    const account = new Account();
    account.id = currentUserId;
    recurringBooking.owner = account;

    const room = new Room();
    room.id = createRecurringDto.roomId;
    recurringBooking.room = room;

    return this.recurringBookingsRepository.save(recurringBooking);
  }
}
