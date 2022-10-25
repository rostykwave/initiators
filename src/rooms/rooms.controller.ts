import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { FindAllByOfficeIdDto } from './dto/find-all-by-officeId.dto';
import { Room } from './room.entity';
import { RoomsService } from './rooms.service';
import { QueryParseIntPipe } from './pipes/queryParseInt.pipe';

@Controller('rooms')
export class RoomsController {
  constructor(private roomsService: RoomsService) {}

  @Post()
  create(@Body() createRoomDto: CreateRoomDto): Promise<Room> {
    return this.roomsService.create(createRoomDto);
  }

  @Get()
  findAllByOfficeId(
    @Query(QueryParseIntPipe) { officeId }: FindAllByOfficeIdDto,
  ): Promise<Room[]> {
    return this.roomsService.findAllByOfficeId(officeId);
  }

}
