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

  async findAllRooms(officeId, soonestBookingsDays) {
    const todaysLocaleDate = todaysLocaleDateString();
    const queryEndDate = addDaysToDate(
      new Date(todaysLocaleDate),
      soonestBookingsDays,
    );

    const allRooms = await this.createQueryBuilder('rooms')
      .leftJoinAndSelect(
        'rooms.oneTimeBookings',
        'oneTimeBooking',
        `oneTimeBooking.meetingDate BETWEEN '${todaysLocaleDate}' AND '${queryEndDate.toISOString()}'`,
      )
      .leftJoinAndSelect(
        'rooms.recurringBookings',
        'recurringBookings',
        'recurringBookings.endDate >= :start_at',
        { start_at: todaysLocaleDate },
      )
      .where('rooms.office.id = :officeId', { officeId })
      .getMany();

    return allRooms;
  }
}
