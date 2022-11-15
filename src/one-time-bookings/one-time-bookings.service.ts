import { Injectable, NotFoundException } from '@nestjs/common';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { Account } from 'src/accounts/account.entity';
import { AccountsService } from 'src/accounts/accounts.service';
import { ServiceException } from 'src/bookings/exceptions/service.exception';
import { GuestsService } from 'src/guests/guests.service';
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
    private readonly roomsRepository: RoomsRepository,
    private readonly guestsService: GuestsService,
    private readonly accountsService: AccountsService,
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
    // Make sure guests emails are unique
    const emails = createOneTimeBookingDto.guests;
    const uniqueEmails = [...new Set(emails)];

    await this.checkEmails(uniqueEmails, currentUserId);

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

    const newOneTimeBooking = await this.oneTimeBookingsRepository.create({
      createdAt: new Date(),
      meetingDate: createOneTimeBookingDto.meetingDate,
      startTime: createOneTimeBookingDto.startTime,
      endTime: createOneTimeBookingDto.endTime,
      room,
      owner: account,
    });

    const booking = await this.oneTimeBookingsRepository.save(
      newOneTimeBooking,
    );

    const guests = await this.guestsService.createGuestsByEmails(
      uniqueEmails,
      currentUserId,
      booking.id,
    );

    return booking;
  }

  private async checkEmails(emails: string[], currentUserId: number) {
    // Check if guests exists
    for (let i = 0; i < emails.length; i += 1) {
      const email = emails[i];
      const guest = await this.accountsService.getAccountByEmail(email);

      if (!guest) {
        throw new ServiceException(
          `Guest with email ${email} not found. Try another one.`,
        );
      }
      // get owner by id
      const owner = await this.accountsService.findOne(currentUserId);

      // check if owner email == guest email
      if (owner.email === guest.email) {
        throw new ServiceException(
          `You can't invite yourself, please remove your email ${owner.email}`,
        );
      }
    }
  }

  // Update for Admin
  async update(
    id: number,
    updateOneTimeBookingDto: UpdateOneTimeBookingDto,
  ): Promise<OneTimeBooking> {
    const booking =
      await this.oneTimeBookingsRepository.findOneTimeBookingWithOwner(id);
    const ownerId = booking.owner.id;

    // Make sure guests emails are unique
    const emails = updateOneTimeBookingDto.guests;
    const uniqueEmails = [...new Set(emails)];

    await this.checkEmails(uniqueEmails, ownerId);

    await this.guestsService.updateGuestsByOneTimeBookingId(
      uniqueEmails,
      ownerId,
      id,
    );

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

  // Update for User
  async updateOwn(
    id: number,
    currentUserId: number,
    updateOneTimeBookingDto: UpdateOneTimeBookingDto,
  ): Promise<OneTimeBooking> {
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

  // Delete for Admin
  async delete(id: number): Promise<DeleteResult> {
    const oneTimeBookingToDelete =
      await this.oneTimeBookingsRepository.findOneBy({ id });

    if (!oneTimeBookingToDelete) {
      throw new ServiceException(
        `Booking with id ${id} not found. Try another one.`,
      );
    }

    await this.guestsService.deleteGuestsByOneTimeBookingId(id);
    return this.oneTimeBookingsRepository.delete(id);
  }

  // Delete for User
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

    await this.guestsService.deleteGuestsByOneTimeBookingId(id);
    return this.oneTimeBookingsRepository.delete(id);
  }
}
