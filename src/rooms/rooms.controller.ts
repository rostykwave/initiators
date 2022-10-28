import { Controller, Get, Query } from '@nestjs/common';

import { FindAllByOfficeIdDto } from './dto/find-all-by-officeId.dto';
import { RoomsService } from './rooms.service';
import { QueryParseIntPipe } from './pipes/queryParseInt.pipe';
import { roomsQueryDto } from './dto/rooms-query.dto';

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

    return {
      data: {
        rooms: allRooms,
      },
    };
  }
}
