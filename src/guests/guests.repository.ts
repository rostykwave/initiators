import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Guest } from './guest.entity';

@Injectable()
export class GuestsRepository extends Repository<Guest> /*implements IGuestsRepository*/ {
  constructor(private dataSource: DataSource) {
    super(Guest, dataSource.createEntityManager());
  }

  async findAllByOneTimeBookingId(id: number): Promise<Guest[]> {
    const guests = await this.createQueryBuilder('guests')
      .where('guests.oneTimeBookingId = :id', { id })
      .getMany();
    return guests;
  }

  async findAllByRecurringBookingId(id: number): Promise<Guest[]> {
    const guests = await this.createQueryBuilder('guests')
      .where('guests.recurringBookingId = :id', { id })
      .getMany();
    return guests;
  }
}
