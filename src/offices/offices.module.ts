import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Office } from './office.entity';
import { OfficesRepository } from './offices.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Office])],
  providers: [OfficesRepository],
})
export class OfficesModule {}
