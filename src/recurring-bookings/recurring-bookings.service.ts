import { Injectable } from '@nestjs/common';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { Account } from 'src/accounts/account.entity';
import { AccountsService } from 'src/accounts/accounts.service';
import { ServiceException } from 'src/bookings/exceptions/service.exception';
import { GuestsService } from 'src/guests/guests.service';
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
    private readonly guestsService: GuestsService,
    private readonly accountsService: AccountsService,
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
    // Make sure guests emails are unique
    const emails = createRecurringBookingDto.guests;
    const uniqueEmails = [...new Set(emails)];

    await this.checkEmails(uniqueEmails, currentUserId);

    const roomFromQueryData = await this.roomsRepository.findOneById(
      createRecurringBookingDto.roomId,
    );

    if (!roomFromQueryData) {
      throw new ServiceException(
        `Room with id ${createRecurringBookingDto.roomId} not found. Try another one.`,
      );
    }
    const account = new Account();
    account.id = currentUserId;

    const room = new Room();
    room.id = createRecurringBookingDto.roomId;

    const newRecurringBooking = await this.recurringBookingsRepository.create({
      createdAt: new Date(),
      startDate: createRecurringBookingDto.startDate,
      endDate: createRecurringBookingDto.endDate,
      startTime: createRecurringBookingDto.startTime,
      endTime: createRecurringBookingDto.endTime,
      daysOfWeek: createRecurringBookingDto.daysOfWeek,
      room,
      owner: account,
    });

    const booking = await this.recurringBookingsRepository.save(
      newRecurringBooking,
    );

    const guests = await this.guestsService.createGuestsByEmails({
      emails: uniqueEmails,
      currentUserId,
      recurringBookingId: booking.id,
    });

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
    updateRecurringBookingDto: UpdateRecurringBookingDto,
  ): Promise<RecurringBooking> {
    const booking =
      await this.recurringBookingsRepository.findRecurringBookingWithOwner(id);
    if (!booking) {
      throw new ServiceException(
        `Booking with id ${id} not found. Try another one.`,
      );
    }
    const ownerId = booking.owner.id;

    console.log('Owner id: ', ownerId);

    // Make sure guests emails are unique
    const emails = updateRecurringBookingDto.guests;
    const uniqueEmails = [...new Set(emails)];

    await this.checkEmails(uniqueEmails, ownerId);

    await this.guestsService.updateGuestsByRecurringBookingId(
      uniqueEmails,
      ownerId,
      id,
    );

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

  // Update for User
  async updateOwn(
    id: number,
    currentUserId: number,
    updateRecurringBookingDto: UpdateRecurringBookingDto,
  ): Promise<RecurringBooking> {
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

  // Delete for Admin
  async delete(id: number): Promise<DeleteResult> {
    const recurringBookingToDelete =
      await this.recurringBookingsRepository.findOneBy({ id });

    if (!recurringBookingToDelete) {
      throw new ServiceException(
        `Booking with id ${id} not found. Try another one.`,
      );
    }

    await this.guestsService.deleteGuestsByRecurringBookingId(id);
    return this.recurringBookingsRepository.delete(id);
  }

  // Delete for User
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

    await this.guestsService.deleteGuestsByRecurringBookingId(id);
    return this.recurringBookingsRepository.delete(id);
  }
}
