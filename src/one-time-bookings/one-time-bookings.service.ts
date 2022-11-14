import { Injectable } from '@nestjs/common';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { Account } from 'src/accounts/account.entity';
import { BookingsMapper } from 'src/bookings/bookings.mapper';
import { ServiceException } from 'src/bookings/exceptions/service.exception';
import { RecurringBookingsRepository } from 'src/recurring-bookings/recurring-bookings.repository';
import { Room } from 'src/rooms/room.entity';
import { RoomsRepository } from 'src/rooms/rooms.repository';
import { DeleteResult } from 'typeorm';
import { CreateOneTimeBookingDto } from './dto/create-one-time-booking.dto';
import { UpdateOneTimeBookingDto } from './dto/update-one-time-booking.dto';
import { OneTimeBooking } from './one-time-booking.entity';
import { OneTimeBookingsRepository } from './one-time-bookings.repository';

@Injectable()
export class OneTimeBookingsService {
  constructor(
    private readonly oneTimeBookingsRepository: OneTimeBookingsRepository,
    private readonly recurringBookingsRepository: RecurringBookingsRepository,
    private readonly roomsRepository: RoomsRepository,
    private readonly bookingsMapper: BookingsMapper,
  ) {}

  async findAllPaginate(
    ownerId: number,
    options: IPaginationOptions,
  ): Promise<Pagination<OneTimeBooking>> {
    return this.oneTimeBookingsRepository.paginate(ownerId, options);
  }

  async create(
    createOneTimeBookingDto: CreateOneTimeBookingDto,
    currentUserId: number,
  ): Promise<OneTimeBooking> {
    const roomFromQueryData = await this.roomsRepository.findOneById(
      createOneTimeBookingDto.roomId,
    );

    if (!roomFromQueryData) {
      throw new ServiceException(
        `Room with id ${createOneTimeBookingDto.roomId} not found. Try another one.`,
        404,
      );
    }

    const account = new Account();
    account.id = currentUserId;

    const room = new Room();
    room.id = createOneTimeBookingDto.roomId;

    const newOneTimeBooking = this.oneTimeBookingsRepository.create({
      createdAt: new Date(),
      meetingDate: createOneTimeBookingDto.meetingDate,
      startTime: createOneTimeBookingDto.startTime,
      endTime: createOneTimeBookingDto.endTime,
      room,
      owner: account,
    });

    /////checkAvaliabilityOfRoomForSpecificTime
    try {
      await this.checkAvaliabilityOfRoomForSpecificTime(
        createOneTimeBookingDto,
      );
    } catch (error) {
      if (error instanceof ServiceException) {
        throw new ServiceException(error.message, error.code);
      } else {
        throw error;
      }
    }
    //////////////////////

    return this.oneTimeBookingsRepository.save(newOneTimeBooking);
  }

  async update(
    id: number,
    updateOneTimeBookingDto: UpdateOneTimeBookingDto,
  ): Promise<OneTimeBooking> {
    const oneTimeBookingToUpdate =
      await this.oneTimeBookingsRepository.findOneBy({ id });

    if (!oneTimeBookingToUpdate) {
      throw new ServiceException(
        `Booking with id ${id} not found. Try another one.`,
      );
    }

    const roomFromQueryData = await this.roomsRepository.findOneById(
      updateOneTimeBookingDto.roomId,
    );

    if (!roomFromQueryData) {
      throw new ServiceException(
        `Room with id ${updateOneTimeBookingDto.roomId} not found. Try another one.`,
      );
    }

    const room = new Room();
    room.id = updateOneTimeBookingDto.roomId;

    oneTimeBookingToUpdate.room = room;
    oneTimeBookingToUpdate.meetingDate = updateOneTimeBookingDto.meetingDate;
    oneTimeBookingToUpdate.startTime = updateOneTimeBookingDto.startTime;
    oneTimeBookingToUpdate.endTime = updateOneTimeBookingDto.endTime;

    return this.oneTimeBookingsRepository.save(oneTimeBookingToUpdate);
  }

  async updateOwn(
    id: number,
    currentUserId: number,
    updateOneTimeBookingDto: UpdateOneTimeBookingDto,
  ) {
    // Check if booking exists
    const oneTimeBookingToUpdate =
      await this.oneTimeBookingsRepository.findOneBy({ id });

    if (!oneTimeBookingToUpdate) {
      throw new ServiceException(
        `Booking with id ${id} not found. Try another one.`,
      );
    }

    // Check if currentUserId (ownerId in db) exists in booking
    const oneTimeBookingToUpdateSafe =
      await this.oneTimeBookingsRepository.findOneByIdAndOwnerId(
        id,
        currentUserId,
      );

    if (!oneTimeBookingToUpdateSafe) {
      throw new ServiceException(`You can change only own booking.`);
    }

    return this.update(id, updateOneTimeBookingDto);
  }

  async delete(id: number): Promise<DeleteResult> {
    const oneTimeBookingToDelete =
      await this.oneTimeBookingsRepository.findOneBy({ id });

    if (!oneTimeBookingToDelete) {
      throw new ServiceException(
        `Booking with id ${id} not found. Try another one.`,
      );
    }

    return this.oneTimeBookingsRepository.delete(id);
  }

  async deleteOwn(id: number, currentUserId: number): Promise<DeleteResult> {
    // Check if booking exists
    const oneTimeBookingToDelete =
      await this.oneTimeBookingsRepository.findOneBy({ id });

    if (!oneTimeBookingToDelete) {
      throw new ServiceException(
        `Booking with id ${id} not found. Try another one.`,
      );
    }

    // Check if currentUserId (ownerId in db) exists in booking
    const oneTimeBookingToDeleteSafe =
      await this.oneTimeBookingsRepository.findOneByIdAndOwnerId(
        id,
        currentUserId,
      );

    if (!oneTimeBookingToDeleteSafe) {
      throw new ServiceException(`You can delete only own booking.`);
    }

    return this.oneTimeBookingsRepository.delete(id);
  }

  async checkAvaliabilityOfRoomForSpecificTime(
    createOneTimeBookingDto: CreateOneTimeBookingDto,
  ): Promise<any> {
    const bookingsAtTheQueryTime =
      await this.oneTimeBookingsRepository.findAllByRoomIdInRange(
        createOneTimeBookingDto.roomId,
        createOneTimeBookingDto.meetingDate,
        createOneTimeBookingDto.startTime,
        createOneTimeBookingDto.endTime,
      );

    if (bookingsAtTheQueryTime.length > 0) {
      throw new ServiceException(
        `Room with ${createOneTimeBookingDto.roomId} will be occupied by another one-time meeting at the query time. Try another time.`,
        400,
      );
    }

    const recurringBookingsAtTheQueryTime =
      await this.recurringBookingsRepository.findAllByRoomIdAndMeetingDateInRange(
        createOneTimeBookingDto.roomId,
        createOneTimeBookingDto.meetingDate,
        createOneTimeBookingDto.startTime,
        createOneTimeBookingDto.endTime,
      );
    const recurringBookingsAtThatMeetingDate = this.bookingsMapper
      .mapRecurringBookings(recurringBookingsAtTheQueryTime)
      .filter((a) => a.meetingDate === createOneTimeBookingDto.meetingDate);

    if (recurringBookingsAtThatMeetingDate.length > 0) {
      throw new ServiceException(
        `Room with ${createOneTimeBookingDto.roomId} will be occupied by recurring meeting at the query time. Try another time.`,
        400,
      );
    }
  }
}
