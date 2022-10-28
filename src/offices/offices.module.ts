import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { OfficesService } from './offices.service';
// import { OfficesController } from './offices.controller';
import { Office } from './office.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Office])],
  // providers: [OfficesService],
  // controllers: [OfficesController],
})
export class OfficesModule {}
