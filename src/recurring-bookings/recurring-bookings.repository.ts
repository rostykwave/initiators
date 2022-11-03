import { DataSource, Repository } from 'typeorm';
import { IRecurringBookingsRepository } from './interfaces/recurring-bookings.repository.interface';
import { Injectable } from '@nestjs/common';
import { RecurringBooking } from './recurring-booking.entity';

@Injectable()
export class RecurringBookingsRepository
  extends Repository<RecurringBooking>
  implements IRecurringBookingsRepository
{
  constructor(private dataSource: DataSource) {
    super(RecurringBooking, dataSource.createEntityManager());
  }

  async findAll() {}
}
