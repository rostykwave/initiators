import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { RoomTypesService } from './roomTypes.service';
// import { RoomTypesController } from './roomTypes.controller';
import { RoomType } from './roomType.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RoomType])],
  // providers: [RoomTypesService],
  // controllers: [RoomTypesController],
})
export class RoomTypesModule {}
