import { Controller, Get, Query } from '@nestjs/common';

import { FindAllByOfficeIdDto } from './dto/find-all-by-officeId.dto';
import { RoomsService } from './rooms.service';
import { QueryParseIntPipe } from './pipes/queryParseInt.pipe';
import { roomsQueryDto } from './dto/rooms-query.dto';
import { reccurringBookingToArrayOfSimpleBookings } from './helpers/reccurringBookingToArrayOfSimpleBookings';

@Controller('rooms')
export class RoomsController {
  constructor(private roomsService: RoomsService) {}

  @Get()
  async findAllByOfficeId(
    @Query(QueryParseIntPipe) { officeId, soonestBookingsDays }: roomsQueryDto,
  ): Promise<FindAllByOfficeIdDto> {
    const allRooms = await this.roomsService.findAllRooms(
      officeId,
      soonestBookingsDays,
    );

    const updatedAllRooms = allRooms.map((room) => {
      const soonestRecurringBookings = room.recurringBookings.flatMap(
        (booking) => {
          return reccurringBookingToArrayOfSimpleBookings(
            booking,
            soonestBookingsDays,
          );
        },
      );

      const updatedRoom = {
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

      return updatedRoom;
    });

    return {
      data: {
        rooms: updatedAllRooms,
      },
    };
  }
}
