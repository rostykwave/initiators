import { Injectable } from '@nestjs/common';
import { Account } from 'src/accounts/account.entity';
import { Room } from 'src/rooms/room.entity';
import { OneTimeBookingDto } from './dto/one-time-booking.dto';

import { OneTimeBooking } from './one-time-booking.entity';
import { OneTimeBookingsRepository } from './one-time-bookings.repository';

@Injectable()
export class OneTimeBookingsService {
  constructor(
    private readonly oneTimeBookingsRepository: OneTimeBookingsRepository,
  ) {}

  async create(
    oneTimeBookingDto: OneTimeBookingDto,
    currentUserId: number,
  ): Promise<OneTimeBooking> {
    const account = new Account();
    account.id = currentUserId;

    const room = new Room();
    room.id = oneTimeBookingDto.roomId;

    const newOneTimeBooking = this.oneTimeBookingsRepository.create({
      createdAt: new Date(),
      meetingDate: oneTimeBookingDto.meetingDate,
      startTime: oneTimeBookingDto.startTime,
      endTime: oneTimeBookingDto.endTime,
      room,
      owner: account,
    });

    return this.oneTimeBookingsRepository.save(newOneTimeBooking);
  }
}
