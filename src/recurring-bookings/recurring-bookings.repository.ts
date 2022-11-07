import { DataSource, Repository } from 'typeorm';
import { IRecurringBookingsRepository } from './interfaces/recurring-bookings.repository.interface';
import { Injectable } from '@nestjs/common';
import { RecurringBooking } from './recurring-booking.entity';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class RecurringBookingsRepository
  extends Repository<RecurringBooking>
  implements IRecurringBookingsRepository
{
  constructor(private dataSource: DataSource) {
    super(RecurringBooking, dataSource.createEntityManager());
  }

  async paginate(
    ownerId: number,
    options: IPaginationOptions,
  ): Promise<Pagination<RecurringBooking>> {
    const allRecurringBookings = await this.createQueryBuilder(
      'recurringBookings',
    )
      .leftJoinAndSelect('recurringBookings.room', 'room')
      .where('recurringBookings.owner.id = :ownerId', { ownerId })
      .orderBy('recurringBookings.id', 'ASC');
    return paginate<RecurringBooking>(allRecurringBookings, options);
  }
}
