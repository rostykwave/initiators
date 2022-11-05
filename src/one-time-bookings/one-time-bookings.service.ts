import { Injectable } from '@nestjs/common';
import { Account } from 'src/accounts/account.entity';
import { Room } from 'src/rooms/room.entity';
import { CreateOneTimeDto } from './dto/one-time-booking.dto';
import { OneTimeBooking } from './one-time-booking.entity';
import { OneTimeBookingsRepository } from './one-time-bookings.repository';

@Injectable()
export class OneTimeBookingsService {
  constructor(
    private readonly oneTimeBookingsRepository: OneTimeBookingsRepository,
  ) {}

  async create(
    createOneTimeDto: CreateOneTimeDto,
    currentUserId: number,
  ): Promise<OneTimeBooking> {
    const oneTimeBooking = new OneTimeBooking();
    oneTimeBooking.createdAt = createOneTimeDto.createdAt;
    oneTimeBooking.meetingDate = createOneTimeDto.meetingDate;
    oneTimeBooking.startTime = createOneTimeDto.startTime;
    oneTimeBooking.endTime = createOneTimeDto.endTime;

    const account = new Account();
    account.id = currentUserId;
    oneTimeBooking.owner = account;

    const room = new Room();
    room.id = createOneTimeDto.roomId;
    oneTimeBooking.room = room;

    return this.oneTimeBookingsRepository.save(oneTimeBooking);
  }
}
