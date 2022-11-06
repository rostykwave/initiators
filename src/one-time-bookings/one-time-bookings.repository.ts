import { DataSource, Repository } from 'typeorm';
import { IOneTimeBookingsRepository } from './interfaces/one-time-bookings.repository.interface';
import { Injectable } from '@nestjs/common';
import { OneTimeBooking } from './one-time-booking.entity';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class OneTimeBookingsRepository
  extends Repository<OneTimeBooking>
  implements IOneTimeBookingsRepository
{
  constructor(private dataSource: DataSource) {
    super(OneTimeBooking, dataSource.createEntityManager());
  }

  async paginate(
    ownerId: number,
    options: IPaginationOptions,
  ): Promise<Pagination<OneTimeBooking>> {
    const allOneTimeBookings = await this.createQueryBuilder('oneTimeBookings')
      .leftJoinAndSelect('oneTimeBookings.room', 'room')
      .where('oneTimeBookings.owner.id = :ownerId', { ownerId })
      .orderBy('oneTimeBookings.id', 'ASC');
    return paginate<OneTimeBooking>(allOneTimeBookings, options);
  }
}
