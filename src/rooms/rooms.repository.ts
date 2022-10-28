import { DataSource, Repository } from 'typeorm';
import { Room } from './room.entity';
import { IRoomRepository } from './rooms.repository.interface';
import { Injectable } from '@nestjs/common';
import { addDaysToDate } from './helpers/addDaysToDate';

@Injectable()
export class RoomRepository
  extends Repository<Room>
  implements IRoomRepository
{
  constructor(private dataSource: DataSource) {
    super(Room, dataSource.createEntityManager());
  }

  findAllRooms(officeId, soonestBookingsDays) {
    const today = new Date();
    const endDateQuery = addDaysToDate(new Date(), soonestBookingsDays);

    return this.createQueryBuilder('rooms')
      .leftJoinAndSelect(
        'rooms.oneTimeBookings',
        'oneTimeBooking',
        `oneTimeBooking.meetingDate BETWEEN '${today.toISOString()}' AND '${endDateQuery.toISOString()}'`,
      )
      .where('rooms.office.id = :officeId', { officeId })

      .getMany();
  }
}
