import { Injectable } from '@nestjs/common';
import { Account } from 'src/accounts/account.entity';
import { Room } from 'src/rooms/room.entity';
import { RecurringBookingDto } from './dto/recurring-booking.dto';
import { RecurringBooking } from './recurring-booking.entity';
import { RecurringBookingsRepository } from './recurring-bookings.repository';

@Injectable()
export class RecurringBookingsService {
  constructor(
    private readonly recurringBookingsRepository: RecurringBookingsRepository,
  ) {}

  async create(
    recurringBookingDto: RecurringBookingDto,
    currentUserId: number,
  ): Promise<RecurringBooking> {
    const account = new Account();
    account.id = currentUserId;

    const room = new Room();
    room.id = recurringBookingDto.roomId;

    const newRecurringBooking = this.recurringBookingsRepository.create({
      createdAt: new Date(),
      startDate: recurringBookingDto.startDate,
      endDate: recurringBookingDto.endDate,
      startTime: recurringBookingDto.startTime,
      endTime: recurringBookingDto.endTime,
      room,
      owner: account,
    });

    return this.recurringBookingsRepository.save(newRecurringBooking);
  }
}
