import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GuestsService } from './guests.service';
// import { GuestsController } from './guests.controller';
import { Guest } from './guest.entity';
import { GuestsRepository } from './guests.repository';
import { AccountsModule } from 'src/accounts/accounts.module';

@Module({
  imports: [TypeOrmModule.forFeature([Guest]), AccountsModule],
  providers: [GuestsService, GuestsRepository],
  exports: [GuestsService],
  // controllers: [GuestsController],
})
export class GuestsModule {}
