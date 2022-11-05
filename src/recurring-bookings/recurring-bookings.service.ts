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
    // const recurringBooking = new RecurringBooking();
    // recurringBooking.createdAt = recurringBookingDto.createdAt;
    // recurringBooking.startDate = recurringBookingDto.startDate;
    // recurringBooking.endDate = recurringBookingDto.endDate;
    // recurringBooking.startTime = recurringBookingDto.startTime;
    // recurringBooking.endTime = recurringBookingDto.endTime;
    // recurringBooking.daysOfWeek = recurringBookingDto.daysOfWeek;

    const account = new Account();
    account.id = currentUserId;
    // recurringBooking.owner = account;

    const room = new Room();
    room.id = recurringBookingDto.roomId;
    // recurringBooking.room = room;

    return this.recurringBookingsRepository.save({
      createdAt: new Date(),
      startDate: recurringBookingDto.startDate,
      endDate: recurringBookingDto.endDate,
      startTime: recurringBookingDto.startTime,
      endTime: recurringBookingDto.endTime,
      room,
      owner: account,
    });
    // return this.recurringBookingsRepository.save(recurringBooking);
  }
}
