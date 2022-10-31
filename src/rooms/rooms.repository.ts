import { DataSource, Repository } from 'typeorm';
import { Room } from './room.entity';
import { IRoomRepository } from './interfaces/rooms.repository.interface';
import { Injectable } from '@nestjs/common';
import { addDaysToDate } from './helpers/addDaysToDate';
import { todaysLocaleDateString } from './helpers/todaysLocaleDateString';

@Injectable()
export class RoomRepository
  extends Repository<Room>
  implements IRoomRepository
{
  constructor(private dataSource: DataSource) {
    super(Room, dataSource.createEntityManager());
  }

  async findAllRooms(officeId: number, soonestBookingsDays: number) {
    const fromDateString = todaysLocaleDateString();
    const toDateString = addDaysToDate(
      new Date(fromDateString),
      soonestBookingsDays,
    )
      .toJSON()
      .split('T')[0];

    const allRooms = await this.createQueryBuilder('rooms')
      .leftJoinAndSelect(
        'rooms.oneTimeBookings',
        'oneTimeBooking',
        'oneTimeBooking.meetingDate BETWEEN :from AND :to',
        { from: fromDateString, to: toDateString },
      )
      .leftJoinAndSelect(
        'rooms.recurringBookings',
        'recurringBookings',
        'recurringBookings.endDate >= :start_at',
        { start_at: fromDateString },
      )
      .where('rooms.office.id = :officeId', { officeId })
      .getMany();

    return allRooms;
  }
}
