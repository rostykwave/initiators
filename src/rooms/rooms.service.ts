import { Injectable } from '@nestjs/common';
import { sortOneTimeBookingsByTimeAndDate } from 'src/one-time-bookings/helpers/sort-one-time-bookings-by-time-and-date';
import { filterReccurringBookingsBySoonestBookingsDays } from 'src/rooms/helpers/filter-by-soonest-bookings-days';
import { reccurringBookingParsing } from '../recurring-bookings/helpers/reccurring-booking-parsing';
import { IAllRoomsUpdated } from './interfaces/all-rooms-updated.interface';
import { Room } from './room.entity';
import { RoomsRepository } from './rooms.repository';

@Injectable()
export class RoomsService {
  constructor(private readonly roomsRepository: RoomsRepository) {}

  async findOneRoom(id: number): Promise<Room> {
    return this.roomsRepository.findOne({
      where: {
        id,
      },
    });
  }

  async findAllRooms(
    officeId: number,
    soonestBookingsDays: number,
  ): Promise<IAllRoomsUpdated[]> {
    const allRooms = await this.roomsRepository.findAllRooms(
      officeId,
      soonestBookingsDays,
    );

    const allRoomsUpdated = allRooms.map((room) => {
      const soonestRecurringBookings = room.recurringBookings.flatMap(
        (booking) => {
          const allreccurringBookings = reccurringBookingParsing(booking);

          return filterReccurringBookingsBySoonestBookingsDays(
            allreccurringBookings,
            soonestBookingsDays,
          );
        },
      );

      const updateRoom = {
        id: room.id,
        name: room.name,
        floor: room.floor,
        devices: room.devices,
        maxPeople: room.maxPeople,
        minPeople: room.minPeople,
        soonestBookings: sortOneTimeBookingsByTimeAndDate([
          ...room.oneTimeBookings,
          ...soonestRecurringBookings,
        ]),
      };

      return updateRoom;
    });

    return allRoomsUpdated;
  }
}
