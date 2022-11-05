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
    // const oneTimeBooking = new OneTimeBooking();
    // oneTimeBooking.createdAt = oneTimeBookingDto.createdAt;
    // oneTimeBooking.meetingDate = oneTimeBookingDto.meetingDate;
    // oneTimeBooking.startTime = oneTimeBookingDto.startTime;
    // oneTimeBooking.endTime = oneTimeBookingDto.endTime;

    const account = new Account();
    account.id = currentUserId;
    // oneTimeBooking.owner = account;

    const room = new Room();
    room.id = oneTimeBookingDto.roomId;
    // oneTimeBooking.room = room;

    return this.oneTimeBookingsRepository.save({
      createdAt: new Date(),
      meetingDate: oneTimeBookingDto.meetingDate,
      startTime: oneTimeBookingDto.startTime,
      endTime: oneTimeBookingDto.endTime,
      room,
      owner: account,
    });
    // return this.oneTimeBookingsRepository.save(oneTimeBooking);
  }
}
