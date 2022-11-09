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

  async findAllByDateAndLocation(
    roomId: number,
    officeId: number,
    startDate: string,
    endDate: string,
  ): Promise<OneTimeBooking[]> {
    return await this.createQueryBuilder('oneTimeBookings')
      .leftJoinAndSelect('oneTimeBookings.room', 'room')
      .where('oneTimeBookings.room.id = :roomId', { roomId })
      // .andWhere('oneTimeBookings.room.office.id = :officeId', { officeId })
      .andWhere('oneTimeBookings.meetingDate BETWEEN :from AND :to', {
        from: startDate,
        to: endDate,
      })
      .orderBy('oneTimeBookings.meetingDate', 'ASC')
      .getMany();
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
}
