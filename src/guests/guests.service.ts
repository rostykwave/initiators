import { Injectable } from '@nestjs/common';
import { Account } from 'src/accounts/account.entity';
import { AccountsService } from 'src/accounts/accounts.service';
import { ServiceException } from 'src/bookings/exceptions/service.exception';
import { OneTimeBooking } from 'src/one-time-bookings/one-time-booking.entity';
import { RecurringBooking } from 'src/recurring-bookings/recurring-booking.entity';
import { Guest } from './guest.entity';
import { GuestsRepository } from './guests.repository';
import { GuestType } from './types/guest.type';
@Injectable()
export class GuestsService {
  constructor(
    private readonly guestsRepository: GuestsRepository,
    private readonly accountsService: AccountsService,
  ) {}

  async createGuestsByEmails(guest: GuestType) {
    const { emails, currentUserId, oneTimeBookingId, recurringBookingId } =
      guest;
    const guests = emails.map(
      async (email) =>
        await this.createGuestByEmail(
          email,
          currentUserId,
          oneTimeBookingId,
          recurringBookingId,
        ),
    );
    return guests;
  }

  async createGuestByEmail(
    email: string,
    currentUserId: number,
    oneTimeBookingId?: number,
    recurringBookingId?: number,
  ): Promise<Guest> {
    const guest = await this.accountsService.getAccountByEmail(email);

    if (!guest) {
      throw new ServiceException(
        `Guest with email ${email} not found. Try another one.`,
      );
    }

    // create owner
    const accountOwner = new Account();
    accountOwner.id = currentUserId;

    if (oneTimeBookingId) {
      const booking = new OneTimeBooking();
      booking.id = oneTimeBookingId;
      const newGuest = this.guestsRepository.create({
        guest,
        owner: accountOwner,
        oneTimeBooking: booking,
      });
      return this.guestsRepository.save(newGuest);
    }

    if (recurringBookingId) {
      const booking = new RecurringBooking();
      booking.id = recurringBookingId;
      const newGuest = this.guestsRepository.create({
        guest,
        owner: accountOwner,
        recurringBooking: booking,
      });
      return this.guestsRepository.save(newGuest);
    } else {
      throw new ServiceException(`Booking id was not provided`);
    }
  }

  async updateGuestsByOneTimeBookingId(
    emails: string[],
    currentUserId: number,
    oneTimeBookingId: number,
  ) {
    const guests = await this.guestsRepository.findAllByOneTimeBookingId(
      oneTimeBookingId,
    );
    // delete old data about guests
    guests.forEach(async (guest) => {
      await this.guestsRepository.delete(guest.id);
    });
    // create new data about guests
    return await this.createGuestsByEmails({
      emails,
      currentUserId,
      oneTimeBookingId,
    });
  }

  async deleteGuestsByOneTimeBookingId(oneTimeBookingId: number) {
    const guests = await this.guestsRepository.findAllByOneTimeBookingId(
      oneTimeBookingId,
    );
    // delete data about guests
    guests.forEach(async (guest) => {
      await this.guestsRepository.delete(guest.id);
    });
  }
}
