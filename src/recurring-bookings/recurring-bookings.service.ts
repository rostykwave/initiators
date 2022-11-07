import { Injectable } from '@nestjs/common';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { RecurringBooking } from './recurring-booking.entity';
import { RecurringBookingsRepository } from './recurring-bookings.repository';

@Injectable()
export class RecurringBookingsService {
  constructor(
    private readonly recurringBookingsRepository: RecurringBookingsRepository,
  ) {}

  async findAllPaginate(
    ownerId: number,
    options: IPaginationOptions,
  ): Promise<Pagination<RecurringBooking>> {
    return this.recurringBookingsRepository.paginate(ownerId, options);
  }
}
