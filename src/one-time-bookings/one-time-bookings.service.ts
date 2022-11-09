import { Injectable, NotFoundException } from '@nestjs/common';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { Account } from 'src/accounts/account.entity';
import { ServiceException } from 'src/bookings/exceptions/service.exception';
import { Room } from 'src/rooms/room.entity';
import { RoomsRepository } from 'src/rooms/rooms.repository';
import { CreateOneTimeBookingDto } from './dto/create-one-time-booking.dto';
import { UpdateOneTimeBookingDto } from './dto/update-one-time-booking.dto';
import { OneTimeBooking } from './one-time-booking.entity';
import { OneTimeBookingsRepository } from './one-time-bookings.repository';

@Injectable()
export class OneTimeBookingsService {
  constructor(
    private readonly oneTimeBookingsRepository: OneTimeBookingsRepository,
    private readonly roomsRepository: RoomsRepository,
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

    return this.oneTimeBookingsRepository.save(newOneTimeBooking);
  }

  async update(
    id: number,
    updateOneTimeBookingDto: UpdateOneTimeBookingDto,
  ): Promise<OneTimeBooking> {
    const oneTimeBookingToUpdate =
      await this.oneTimeBookingsRepository.findOneBy({ id });

    if (!oneTimeBookingToUpdate) {
      throw new NotFoundException(
        `Booking with id ${id} not found. Try another one.`,
      );
    }

    const roomFromQueryData = await this.roomsRepository.findOneById(
      updateOneTimeBookingDto.roomId,
    );

    if (!roomFromQueryData) {
      throw new NotFoundException(
        `Room with id ${updateOneTimeBookingDto.roomId} not found. Try another one.`,
      );
    }

    const room = new Room();
    room.id = updateOneTimeBookingDto.roomId;

    oneTimeBookingToUpdate.room = room;
    oneTimeBookingToUpdate.meetingDate = updateOneTimeBookingDto.meetingDate;
    oneTimeBookingToUpdate.startTime = updateOneTimeBookingDto.startTime;
    oneTimeBookingToUpdate.endTime = updateOneTimeBookingDto.endTime;
    oneTimeBookingToUpdate.createdAt = new Date();

    return this.oneTimeBookingsRepository.save(oneTimeBookingToUpdate);
  }
}
