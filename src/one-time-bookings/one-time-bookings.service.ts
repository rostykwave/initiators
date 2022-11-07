import { Injectable } from '@nestjs/common';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { OneTimeBooking } from './one-time-booking.entity';
import { OneTimeBookingsRepository } from './one-time-bookings.repository';

@Injectable()
export class OneTimeBookingsService {
  constructor(
    private readonly oneTimeBookingsRepository: OneTimeBookingsRepository,
  ) {}

  async findAllPaginate(
    ownerId: number,
    options: IPaginationOptions,
  ): Promise<Pagination<OneTimeBooking>> {
    return this.oneTimeBookingsRepository.paginate(ownerId, options);
  }
}
