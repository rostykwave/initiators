import { Injectable, NotFoundException } from '@nestjs/common';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { Account } from 'src/accounts/account.entity';
import { ServiceException } from 'src/bookings/exceptions/service.exception';
import { Room } from 'src/rooms/room.entity';
import { RoomsRepository } from 'src/rooms/rooms.repository';
import { DeleteResult } from 'typeorm';
import { CreateRecurringBookingDto } from './dto/create-recurring-booking.dto';
import { UpdateRecurringBookingDto } from './dto/update-recurring-booking.dto';
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
    const roomFromQueryData = await this.roomsRepository.findOneById(
      createRecurringBookingDto.roomId,
    );

    if (!roomFromQueryData) {
      throw new ServiceException(
        `Room with id ${createRecurringBookingDto.roomId} not found. Try another one.`,
        404,
      );
    }

    const bookingsAtTheQueryTime =
      await this.recurringBookingsRepository.findAllByRoomIdInTimeRange(
        createRecurringBookingDto.roomId,
        createRecurringBookingDto.startDate,
        createRecurringBookingDto.endDate,
        createRecurringBookingDto.startTime,
        createRecurringBookingDto.endTime,
        createRecurringBookingDto.daysOfWeek,
      );

    if (bookingsAtTheQueryTime.length > 0) {
      throw new ServiceException(
        `Room with ${createRecurringBookingDto.roomId} will be occupied at the query time. Try another time.`,
        400,
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

  async update(
    id: number,
    updateRecurringBookingDto: UpdateRecurringBookingDto,
  ): Promise<RecurringBooking> {
    const recurringBookingToUpdate =
      await this.recurringBookingsRepository.findOneBy({ id });

    if (!recurringBookingToUpdate) {
      throw new ServiceException(
        `Booking with id ${id} not found. Try another one.`,
      );
    }

    const roomFromQueryData = await this.roomsRepository.findOneById(
      updateRecurringBookingDto.roomId,
    );

    if (!roomFromQueryData) {
      throw new ServiceException(
        `Room with id ${updateRecurringBookingDto.roomId} not found. Try another one.`,
      );
    }

    const room = new Room();
    room.id = updateRecurringBookingDto.roomId;

    recurringBookingToUpdate.room = room;
    recurringBookingToUpdate.startDate = updateRecurringBookingDto.startDate;
    recurringBookingToUpdate.endDate = updateRecurringBookingDto.endDate;
    recurringBookingToUpdate.startTime = updateRecurringBookingDto.startTime;
    recurringBookingToUpdate.endTime = updateRecurringBookingDto.endTime;
    recurringBookingToUpdate.daysOfWeek = updateRecurringBookingDto.daysOfWeek;

    return this.recurringBookingsRepository.save(recurringBookingToUpdate);
  }

  async updateOwn(
    id: number,
    currentUserId: number,
    updateRecurringBookingDto: UpdateRecurringBookingDto,
  ) {
    // Check if booking exists
    const recurringBookingToUpdate =
      await this.recurringBookingsRepository.findOneBy({ id });

    if (!recurringBookingToUpdate) {
      throw new ServiceException(
        `Booking with id ${id} not found. Try another one.`,
      );
    }

    // Check if currentUserId (ownerId in db) exists in booking
    const recurringBookingToUpdateSafe =
      await this.recurringBookingsRepository.findOneByIdAndOwnerId(
        id,
        currentUserId,
      );

    if (!recurringBookingToUpdateSafe) {
      throw new ServiceException(`You can change only own booking.`);
    }

    return this.update(id, updateRecurringBookingDto);
  }

  async delete(id: number): Promise<DeleteResult> {
    const recurringBookingToDelete =
      await this.recurringBookingsRepository.findOneBy({ id });

    if (!recurringBookingToDelete) {
      throw new ServiceException(
        `Booking with id ${id} not found. Try another one.`,
      );
    }

    return this.recurringBookingsRepository.delete(id);
  }

  async deleteOwn(id: number, currentUserId: number): Promise<DeleteResult> {
    // Check if booking exists
    const recurringBookingToDelete =
      await this.recurringBookingsRepository.findOneBy({ id });

    if (!recurringBookingToDelete) {
      throw new ServiceException(
        `Booking with id ${id} not found. Try another one.`,
      );
    }

    // Check if currentUserId (ownerId in db) exists in booking
    const recurringBookingToDeleteSafe =
      await this.recurringBookingsRepository.findOneByIdAndOwnerId(
        id,
        currentUserId,
      );

    if (!recurringBookingToDeleteSafe) {
      throw new ServiceException(`You can delete only own booking.`);
    }

    return this.recurringBookingsRepository.delete(id);
  }
}
