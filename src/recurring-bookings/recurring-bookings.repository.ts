import { DataSource, Repository } from 'typeorm';
import { IRecurringBookingsRepository } from './interfaces/recurring-bookings.repository.interface';
import { Injectable } from '@nestjs/common';
import { DaysOfWeek, RecurringBooking } from './recurring-booking.entity';
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

  async findAllByRoomIdInTimeRange(
    roomId: number,
    startDate: Date,
    endDate: Date,
    startTime: Date,
    endTime: Date,
    daysOfWeek: DaysOfWeek[],
  ): Promise<RecurringBooking[]> {
    return await this.createQueryBuilder('recurringBookings')
      .leftJoinAndSelect('recurringBookings.room', 'room')
      .where('room.id = :roomId', { roomId })
      .andWhere('recurringBookings.startDate >= :startDate', { startDate })
      .andWhere('recurringBookings.startDate <= :endDate', { endDate })
      .andWhere('recurringBookings.endDate <= :endDate', { endDate })
      .andWhere('recurringBookings.endDate > :startDate', { startDate })
      .andWhere('recurringBookings.startTime <= :endTime', { endTime })
      .andWhere(' recurringBookings.endTime >= :startTime', { startTime })
      .andWhere(' recurringBookings.daysOfWeek && :daysOfWeek', { daysOfWeek })
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

  async findOneByIdAndOwnerId(id: number, ownerId: number) {
    const booking = await this.createQueryBuilder('recurringBookings')
      .where('recurringBookings.id = :id', { id })
      .andWhere('recurringBookings.owner.id = :ownerId', { ownerId })
      .getOne();
    return booking;
  }
}
