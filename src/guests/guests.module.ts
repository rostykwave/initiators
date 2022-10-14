import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { GuestsService } from './guests.service';
// import { GuestsController } from './guests.controller';
import { Guest } from './guest.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Guest])],
  // providers: [GuestsService],
  // controllers: [GuestsController],
})
export class GuestsModule {}
