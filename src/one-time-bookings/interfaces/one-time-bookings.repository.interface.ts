import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { OneTimeBooking } from '../one-time-booking.entity';

export interface IOneTimeBookingsRepository {
  paginate(
    ownerId: number,
    options: IPaginationOptions,
  ): Promise<Pagination<OneTimeBooking>>;
}
