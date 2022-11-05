// import { OneTimeBooking } from '../one-time-booking.entity';

import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { OneTimeBooking } from '../one-time-booking.entity';

export interface IOneTimeBookingsRepository {
  // findAll(): Promise<OneTimeBooking[]>;
  findAll(ownerId: number): void;
  paginate(
    ownerId: number,
    options: IPaginationOptions,
  ): Promise<Pagination<OneTimeBooking>>;
}
