import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from './room.entity';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { RoomsRepository } from './rooms.repository';
import { BookingsMapper } from 'src/bookings/bookings.mapper';

@Module({
  imports: [TypeOrmModule.forFeature([Room])],
  providers: [RoomsService, RoomsRepository, BookingsMapper],
  controllers: [RoomsController],
  exports: [RoomsService],
})
export class RoomsModule {}
