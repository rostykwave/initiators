import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Office } from './office.entity';
import { IOfficesRepository } from './interfaces/offices.repository.interface';

@Injectable()
export class OfficesRepository
  extends Repository<Office>
  implements IOfficesRepository
{
  constructor(private dataSource: DataSource) {
    super(Office, dataSource.createEntityManager());
  }

  async findOneById(id: number) {
    return this.findOne({
      where: {
        id,
      },
    });
  }
}
