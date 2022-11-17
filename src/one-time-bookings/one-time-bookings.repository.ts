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

  async findAllBookingsByOfficeIdInRange(
    officeId: number,
    startDate: Date,
    endDate: Date,
  ): Promise<OneTimeBooking[]> {
    return await this.createQueryBuilder('oneTimeBookings')
      .leftJoinAndSelect('oneTimeBookings.room', 'room')
      .leftJoinAndSelect('room.office', 'office')
      .where('office.id = :officeId', { officeId })
      .andWhere('oneTimeBookings.meetingDate BETWEEN :from AND :to', {
        from: startDate,
        to: endDate,
      })
      .orderBy('oneTimeBookings.meetingDate', 'ASC')
      .getMany();
  }

  async findAllByRoomIdInRange(
    roomId: number,
    meetingDate: Date,
    startTime: Date,
    endTime: Date,
  ): Promise<OneTimeBooking[]> {
    return await this.createQueryBuilder('oneTimeBookings')
      .leftJoinAndSelect('oneTimeBookings.room', 'room')
      .where('room.id = :roomId', { roomId })
      .andWhere('oneTimeBookings.meetingDate = :meetingDate', { meetingDate })
      .andWhere('oneTimeBookings.startTime < :endTime', { endTime })
      .andWhere(' oneTimeBookings.endTime > :startTime', { startTime })
      .getMany();
  }

  async findAllByRoomIdAndDatesInRange(
    roomId: number,
    startDate: Date,
    endDate: Date,
    startTime: Date,
    endTime: Date,
  ): Promise<OneTimeBooking[]> {
    return await this.createQueryBuilder('oneTimeBookings')
      .leftJoinAndSelect('oneTimeBookings.room', 'room')
      .where('room.id = :roomId', { roomId })
      .andWhere('oneTimeBookings.meetingDate >= :startDate', { startDate })
      .andWhere('oneTimeBookings.meetingDate <= :endDate', { endDate })
      .andWhere('oneTimeBookings.startTime < :endTime', { endTime })
      .andWhere(' oneTimeBookings.endTime > :startTime', { startTime })
      .getMany();
  }

  async findAllByOwnerId(ownerId: number): Promise<OneTimeBooking[]> {
    const fromDateString = parseDateStringWithoutTime(new Date());

    return await this.createQueryBuilder('oneTimeBookings')
      .leftJoinAndSelect('oneTimeBookings.room', 'room')
      .leftJoinAndSelect('oneTimeBookings.owner', 'owner')
      .leftJoinAndSelect('oneTimeBookings.guests', 'guest')
      .leftJoinAndSelect('guest.guest', 'gu')
      .where('oneTimeBookings.owner.id = :ownerId', { ownerId })
      .andWhere('oneTimeBookings.meetingDate >= :start_at', {
        start_at: fromDateString,
      })
      .orderBy('oneTimeBookings.meetingDate', 'ASC')
      .getMany();
  }

  async findAllByGuestId(guestId: number): Promise<OneTimeBooking[]> {
    const fromDateString = parseDateStringWithoutTime(new Date());

    return await this.createQueryBuilder('oneTimeBookings')
      .leftJoinAndSelect('oneTimeBookings.room', 'room')
      .leftJoinAndSelect('oneTimeBookings.owner', 'owner')
      .leftJoinAndSelect('oneTimeBookings.guests', 'guest')
      .leftJoinAndSelect('guest.guest', 'gu')
      .where('gu.id = :guestId', { guestId })
      .andWhere('oneTimeBookings.meetingDate >= :start_at', {
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

  async findOneByIdAndOwnerId(
    id: number,
    ownerId: number,
  ): Promise<OneTimeBooking> {
    const booking = await this.createQueryBuilder('oneTimeBookings')
      .where('oneTimeBookings.id = :id', { id })
      .andWhere('oneTimeBookings.owner.id = :ownerId', { ownerId })
      .getOne();
    return booking;
  }

  async findOneTimeBookingWithOwner(id: number): Promise<OneTimeBooking> {
    return await this.createQueryBuilder('oneTimeBookings')
      .leftJoinAndSelect('oneTimeBookings.owner', 'account')
      .where('oneTimeBookings.id = :id', { id })
      .getOne();
  }
}
