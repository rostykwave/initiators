import { DataSource, Repository } from 'typeorm';
import { Room } from './room.entity';
import { IRoomRepository } from './rooms.repository.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RoomRepository
  extends Repository<Room>
  implements IRoomRepository
{
  constructor(private dataSource: DataSource) {
    super(Room, dataSource.createEntityManager());
  }

  findAllRooms(officeId, soonestBookingsDays) {
    console.log('soonestBookingsDays', soonestBookingsDays);
    return this.find({
      relations: {
        oneTimeBookings: true,
        recurringBookings: true,
      },
      where: {
        office: {
          id: officeId,
        },
      },
      order: {
        id: 'ASC',
      },
    });
  }
}
