import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from './room.entity';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { RoomRepository } from './rooms.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Room])],
  providers: [RoomsService, RoomRepository],
  controllers: [RoomsController],
})
export class RoomsModule {}
