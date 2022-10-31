import { DataSource, Repository } from 'typeorm';
import { Room } from './room.entity';
import { IRoomRepository } from './rooms.repository.interface';
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
    console.log('todaysLocaleDate', todaysLocaleDate);
    // const todaysDateString = new Date().toJSON().slice(0, 10);
    // const todaysDateString = new Date().toLocaleString().slice(0, 10);
    const queryEndDate = addDaysToDate(
      new Date(todaysLocaleDate),
      soonestBookingsDays,
    );
    console.log('queryEndDate', queryEndDate);

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
