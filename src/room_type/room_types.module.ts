import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { Room_TypesService } from './room_Types.service';
// import { Room_TypesController } from './room_Types.controller';
import { Room_Type } from './room_type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Room_Type])],
  // providers: [Room_TypesService],
  // controllers: [Room_TypesController],
})
export class Room_TypesModule {}
