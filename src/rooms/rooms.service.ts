import { Injectable } from '@nestjs/common';
import { BookingsMapper } from 'src/bookings/bookings.mapper';
import { sortBookingsByTimeAndDate } from 'src/one-time-bookings/helpers/sort-bookings-by-time-and-date';
import { IAllRoomsUpdated } from './interfaces/all-rooms-updated.interface';
import { Room } from './room.entity';
import { RoomsRepository } from './rooms.repository';

@Injectable()
export class RoomsService {
  constructor(
    private readonly roomsRepository: RoomsRepository,
    private readonly bookingsMapper: BookingsMapper,
  ) {}

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
      const updateRoom = {
        id: room.id,
        name: room.name,
        floor: room.floor,
        devices: room.devices,
        maxPeople: room.maxPeople,
        minPeople: room.minPeople,
        soonestBookings: sortBookingsByTimeAndDate([
          ...this.bookingsMapper.mapOneTimeBookings(room.oneTimeBookings),
          ...this.bookingsMapper.mapRecurringBookings(room.recurringBookings),
        ]),
      };

      return updateRoom;
    });

    return allRoomsUpdated;
  }
}
