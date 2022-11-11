import { DataSource, Repository } from 'typeorm';
import { IOneTimeBookingsRepository } from './interfaces/one-time-bookings.repository.interface';
import { Injectable } from '@nestjs/common';
import { OneTimeBooking } from './one-time-booking.entity';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { parseDateStringWithoutTime } from 'src/helpers/parse-date-string-without-time';

@Injectable()
export class OneTimeBookingsRepository
  extends Repository<OneTimeBooking>
  implements IOneTimeBookingsRepository
{
  constructor(private dataSource: DataSource) {
    super(OneTimeBooking, dataSource.createEntityManager());
  }

  async findAllByOwnerId(ownerId: number): Promise<OneTimeBooking[]> {
    const fromDateString = parseDateStringWithoutTime(new Date());

    return await this.createQueryBuilder('oneTimeBookings')
      .leftJoinAndSelect('oneTimeBookings.room', 'room')
      .where('oneTimeBookings.owner.id = :ownerId', { ownerId })
      .where('oneTimeBookings.meetingDate >= :start_at', {
        start_at: fromDateString,
      })
      .orderBy('oneTimeBookings.meetingDate', 'ASC')
      .getMany();
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

  async findOneByIdAndOwnerId(id: number, ownerId: number) {
    const booking = await this.createQueryBuilder('oneTimeBookings')
      .where('oneTimeBookings.id = :id', { id })
      .andWhere('oneTimeBookings.owner.id = :ownerId', { ownerId })
      .getOne();
    return booking;
  }
}
