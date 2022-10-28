import { DataSource, Repository } from 'typeorm';
import { Room } from './room.entity';
import { IRoomRepository } from './rooms.repository.interface';
import { Injectable } from '@nestjs/common';
import { addDaysToDate } from './helpers/addDaysToDate';
import { reccurringBookingToArrayOfSimpleBookings } from './helpers/reccurringBookingToArrayOfSimpleBookings';

@Injectable()
export class RoomRepository
  extends Repository<Room>
  implements IRoomRepository
{
  constructor(private dataSource: DataSource) {
    super(Room, dataSource.createEntityManager());
  }

  async findAllRooms(officeId, soonestBookingsDays) {
    const today = new Date();
    const endDateQuery = addDaysToDate(new Date(), soonestBookingsDays);

    const allRooms = await this.createQueryBuilder('rooms')
      .leftJoinAndSelect(
        'rooms.oneTimeBookings',
        'oneTimeBooking',
        `oneTimeBooking.meetingDate BETWEEN '${today.toISOString()}' AND '${endDateQuery.toISOString()}'`,
      )
      .leftJoinAndSelect(
        'rooms.recurringBookings',
        'recurringBookings',
        'recurringBookings.endDate >= :start_at',
        { start_at: today },
      )
      .where('rooms.office.id = :officeId', { officeId })

      .getMany();

    allRooms.map((room) => {
      // console.log('rooom', room.recurringBookings);
      room.recurringBookings.map((booking) => {
        const result = reccurringBookingToArrayOfSimpleBookings(booking);
        return result;
      });
    });

    ///return
    return allRooms;
  }
}
