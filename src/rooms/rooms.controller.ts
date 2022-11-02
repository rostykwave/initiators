import { Controller, Get, Query } from '@nestjs/common';
import { IFindAllByOfficeId } from './interfaces/find-all-by-officeId.interface';
import { RoomsService } from './rooms.service';
import { roomsOnSoonestBookingsDaysDto } from './dto/rooms-on-soonest-bookings-days.dto';
import { roomsQueryParseIntPipe } from './pipes/queryParseInt.pipe';

@Controller('rooms')
export class RoomsController {
  constructor(private roomsService: RoomsService) {}

  @Get()
  async findAllByOfficeId(
    @Query(roomsQueryParseIntPipe)
    { officeId, soonestBookingsDays }: roomsOnSoonestBookingsDaysDto,
  ): Promise<IFindAllByOfficeId> {
    const allRoomsUpdated = await this.roomsService.findAllRooms(
      officeId,
      soonestBookingsDays,
    );

    return {
      data: {
        rooms: allRoomsUpdated,
      },
    };
  }
}
