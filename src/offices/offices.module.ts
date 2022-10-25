import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { OfficesService } from './offices.service';
// import { OfficesController } from './offices.controller';
import { Office } from './office.entity';
import { OfficesService } from './offices.service';
import { OfficesController } from './offices.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Office])],
  providers: [OfficesService],
  controllers: [OfficesController],
  // providers: [OfficesService],
  // controllers: [OfficesController],
})
export class OfficesModule {}
