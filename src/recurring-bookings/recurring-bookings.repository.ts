import { DataSource, Repository } from 'typeorm';
import { IRecurringBookingsRepository } from './interfaces/recurring-bookings.repository.interface';
import { Injectable } from '@nestjs/common';
import { RecurringBooking } from './recurring-booking.entity';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { parseDateStringWithoutTime } from 'src/helpers/parse-date-string-without-time';

@Injectable()
export class RecurringBookingsRepository
  extends Repository<RecurringBooking>
  implements IRecurringBookingsRepository
{
  constructor(private dataSource: DataSource) {
    super(RecurringBooking, dataSource.createEntityManager());
  }

  async findAllBookingsByOfficeIdInRange(
    officeId: number,
    endDate: Date,
  ): Promise<RecurringBooking[]> {
    return await this.createQueryBuilder('recurringBookings')
      .leftJoinAndSelect('recurringBookings.room', 'room')
      .leftJoinAndSelect('room.office', 'office')
      .where('office.id = :officeId', { officeId })
      .andWhere('recurringBookings.endDate >= :start_at', {
        start_at: endDate,
      })
      .orderBy('recurringBookings.startDate', 'ASC')
      .getMany();
  }

  async findAllByOwnerId(ownerId: number): Promise<RecurringBooking[]> {
    const fromDateString = parseDateStringWithoutTime(new Date());

    return await this.createQueryBuilder('recurringBookings')
      .leftJoinAndSelect('recurringBookings.room', 'room')
      .where('recurringBookings.owner.id = :ownerId', { ownerId })
      .where('recurringBookings.endDate >= :start_at', {
        start_at: fromDateString,
      })
      .orderBy('recurringBookings.startDate', 'ASC')
      .getMany();
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

  async findOneByIdAndOwnerId(
    id: number,
    ownerId: number,
  ): Promise<RecurringBooking> {
    const booking = await this.createQueryBuilder('recurringBookings')
      .where('recurringBookings.id = :id', { id })
      .andWhere('recurringBookings.owner.id = :ownerId', { ownerId })
      .getOne();
    return booking;
  }

  async findRecurringBookingWithOwner(id: number): Promise<RecurringBooking> {
    return await this.createQueryBuilder('recurringBookings')
      .leftJoinAndSelect('recurringBookings.owner', 'account')
      .where('recurringBookings.id = :id', { id })
      .getOne();
  }
}
