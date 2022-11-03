import { Injectable } from '@nestjs/common';
import { CreateOneTimeDto } from './dto/create-one-time.dto';
import { OneTimeBooking } from './one-time-booking.entity';
import { OneTimeBookingsRepository } from './one-time-bookings.repository';

@Injectable()
export class OneTimeBookingsService {
  constructor(
    private readonly oneTimeBookingsRepository: OneTimeBookingsRepository,
  ) {}

  async create(createOneTimeDto: CreateOneTimeDto): Promise<OneTimeBooking> {
    const oneTimeBooking = new OneTimeBooking();
    oneTimeBooking.createdAt = createOneTimeDto.createdAt;
    oneTimeBooking.meetingDate = createOneTimeDto.meetingDate;
    oneTimeBooking.startTime = createOneTimeDto.startTime;
    oneTimeBooking.endTime = createOneTimeDto.endTime;

    // oneTimeBooking.ownerId = createOneTimeDto.ownerId;
    // oneTimeBooking.roomId = createOneTimeDto.roomId;

    return this.oneTimeBookingsRepository.save(oneTimeBooking);
  }
}
