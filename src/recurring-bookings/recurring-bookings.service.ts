import { Injectable } from '@nestjs/common';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { Account } from 'src/accounts/account.entity';
import { ServiceException } from 'src/bookings/exceptions/service.exception';
import { Room } from 'src/rooms/room.entity';
import { RoomsRepository } from 'src/rooms/rooms.repository';
import { CreateRecurringBookingDto } from './dto/create-recurring-booking.dto';
import { RecurringBooking } from './recurring-booking.entity';
import { RecurringBookingsRepository } from './recurring-bookings.repository';

@Injectable()
export class RecurringBookingsService {
  constructor(
    private readonly recurringBookingsRepository: RecurringBookingsRepository,
    private readonly roomsRepository: RoomsRepository,
  ) {}

  async findAllPaginate(
    ownerId: number,
    options: IPaginationOptions,
  ): Promise<Pagination<RecurringBooking>> {
    return this.recurringBookingsRepository.paginate(ownerId, options);
  }

  async create(
    createRecurringBookingDto: CreateRecurringBookingDto,
    currentUserId: number,
  ): Promise<RecurringBooking> {
    const doesRoomExists = await this.roomsRepository.findOne({
      where: {
        id: createRecurringBookingDto.roomId,
      },
    });

    if (!doesRoomExists) {
      throw new ServiceException(
        `Room with id ${createRecurringBookingDto.roomId} not found. Try another one.`,
        404,
      );
    }
    const account = new Account();
    account.id = currentUserId;

    const room = new Room();
    room.id = createRecurringBookingDto.roomId;

    const newRecurringBooking = this.recurringBookingsRepository.create({
      createdAt: new Date(),
      startDate: createRecurringBookingDto.startDate,
      endDate: createRecurringBookingDto.endDate,
      startTime: createRecurringBookingDto.startTime,
      endTime: createRecurringBookingDto.endTime,
      daysOfWeek: createRecurringBookingDto.daysOfWeek,
      room,
      owner: account,
    });

    return this.recurringBookingsRepository.save(newRecurringBooking);
  }
}
