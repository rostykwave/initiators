import { Injectable } from '@nestjs/common';
import { reccurringBookingParsing } from './helpers/reccurring-booking-parsing';
import { IAllRoomsUpdated } from './interfaces/all-rooms-updated.interface';
import { RoomRepository } from './rooms.repository';

@Injectable()
export class RoomsService {
  constructor(private readonly roomRepository: RoomRepository) {}

  async findAllRooms(
    officeId: number,
    soonestBookingsDays: number,
  ): Promise<IAllRoomsUpdated[]> {
    const allRooms = await this.roomRepository.findAllRooms(
      officeId,
      soonestBookingsDays,
    );

    const allRoomsUpdated = allRooms.map((room) => {
      const soonestRecurringBookings = room.recurringBookings.flatMap(
        (booking) => {
          return reccurringBookingParsing(booking, soonestBookingsDays);
        },
      );

      const updateRoom = {
        id: room.id,
        name: room.name,
        floor: room.floor,
        devices: room.devices,
        maxPeople: room.maxPeople,
        minPeople: room.minPeople,
        soonestBookings: [
          ...room.oneTimeBookings,
          ...soonestRecurringBookings,
        ].sort((a, b) => {
          return (
            new Date(`${a.meetingDate} ${a.startTime}`).getTime() -
            new Date(`${b.meetingDate} ${b.startTime}`).getTime()
          );
        }),
      };

      return updateRoom;
    });

    return allRoomsUpdated;
  }
}
