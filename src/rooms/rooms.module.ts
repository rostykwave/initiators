import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from './room.entity';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { Office } from 'src/offices/office.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Room, Office])],
  providers: [RoomsService],
  controllers: [RoomsController],
})
export class RoomsModule {}
