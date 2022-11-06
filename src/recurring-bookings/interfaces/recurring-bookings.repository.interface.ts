import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { RecurringBooking } from '../recurring-booking.entity';

export interface IRecurringBookingsRepository {
  paginate(
    ownerId: number,
    options: IPaginationOptions,
  ): Promise<Pagination<RecurringBooking>>;
}
