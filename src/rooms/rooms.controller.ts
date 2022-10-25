import { Body, Controller, Post } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { Room } from './room.entity';
import { RoomsService } from './rooms.service';

@Controller('rooms')
export class RoomsController {
  constructor(private roomsService: RoomsService) {}

  @Post()
  create(@Body() createRoomDto: CreateRoomDto): void {
    // create(@Body() createRoomDto: CreateRoomDto): Promise<Room> {
    this.roomsService.create(createRoomDto);
  }

  //   @Get()
  //   findAll() {
  //     return this.roomsService.findAll();
  //   }

  //   @Get(':id')
  //   findOne(@Param('id', ParseIntPipe) id: number) {
  //     return this.roomsService.findOne(id);
  //   }
}
