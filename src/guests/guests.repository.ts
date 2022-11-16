import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Guest } from './guest.entity';

@Injectable()
export class GuestsRepository extends Repository<Guest> /*implements IGuestsRepository*/ {
  constructor(private dataSource: DataSource) {
    super(Guest, dataSource.createEntityManager());
  }

  async findAllByOneTimeBookingId(id: number): Promise<Guest[]> {
    const guests = await this.createQueryBuilder('guests')
      .where('guests.oneTimeBookingId = :id', { id })
      .getMany();
    return guests;
  }

  async findAllByRecurringBookingId(id: number): Promise<Guest[]> {
    const guests = await this.createQueryBuilder('guests')
      .where('guests.recurringBookingId = :id', { id })
      .getMany();
    return guests;
  }

  // Should return an array of accounts that were invited on one-time booking
  async findGuestsByOneTimeBookingId(id: number) {
    const guests = await this.createQueryBuilder('guests')
      .leftJoinAndSelect('guests.guest', 'account')
      .where('guests.oneTimeBookingId = :id', { id })
      .getMany();
    return guests;
  }

  // Should return an array of accounts that were invited on recurring booking
  async findGuestsByRecurringBookingId(id: number) {
    const guests = await this.createQueryBuilder('guests')
      .leftJoinAndSelect('guests.guest', 'account')
      .where('guests.recurringBookingId = :id', { id })
      .getMany();
    return guests;
  }

  // Should return an array of one-time bookings where you were invited
  async findOneTimeBookingsByCurrentUserId(id: number) {
    const guests = await this.createQueryBuilder('guests')
      .leftJoinAndSelect('guests.oneTimeBooking', 'one_time_booking')
      .where('guests.guestId = :id', { id })
      .getMany();
    return guests;
  }

  // Should return an array of recurring bookings where you were invited
  async findRecurringBookingsByCurrentUserId(id: number) {
    const guests = await this.createQueryBuilder('guests')
      .leftJoinAndSelect('guests.recurringBooking', 'recurring_booking')
      .where('guests.guestId = :id', { id })
      .getMany();
    return guests;
  }
}
