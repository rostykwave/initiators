import { DataSource, Repository } from 'typeorm';
import { Room } from './room.entity';
import { IRoomsRepository } from './interfaces/rooms.repository.interface';
import { Injectable } from '@nestjs/common';
import { addDaysToDate } from '../helpers/add-days-to-date';
import { parseDateStringWithoutTime } from '../helpers/parse-date-string-without-time';

@Injectable()
export class RoomsRepository
  extends Repository<Room>
  implements IRoomsRepository
{
  constructor(private dataSource: DataSource) {
    super(Room, dataSource.createEntityManager());
  }

  async findOneById(id: number) {
    return this.findOne({
      where: {
        id,
      },
    });
  }

  async findAllRooms(officeId: number, soonestBookingsDays: number) {
    const fromDateString = parseDateStringWithoutTime(new Date());

    const toDateString = parseDateStringWithoutTime(
      addDaysToDate(new Date(fromDateString), soonestBookingsDays),
    );

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
      .orderBy('rooms.id', 'ASC')
      .getMany();

    return allRooms;
  }
}
