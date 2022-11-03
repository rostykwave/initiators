import { DataSource, Repository } from 'typeorm';
import { IOneTimeBookingsRepository } from './interfaces/one-time-bookings.repository.interface';
import { Injectable } from '@nestjs/common';
import { OneTimeBooking } from './one-time-booking.entity';

@Injectable()
export class OneTimeBookingsRepository
  extends Repository<OneTimeBooking>
  implements IOneTimeBookingsRepository
{
  constructor(private dataSource: DataSource) {
    super(OneTimeBooking, dataSource.createEntityManager());
  }

  async findAll() {}
}
