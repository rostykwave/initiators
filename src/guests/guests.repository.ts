import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Guest } from './guest.entity';

@Injectable()
export class GuestsRepository extends Repository<Guest> /*implements IGuestsRepository*/ {
  constructor(private dataSource: DataSource) {
    super(Guest, dataSource.createEntityManager());
  }
}
