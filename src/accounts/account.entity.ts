import { Booking } from 'src/bookings/bookings.entity';
import { Guest } from 'src/guests/guests.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

export enum Role {
  GUEST = 'Guest',
  USER = 'User',
  ADMIN = 'Admin',
}

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  Account_ID: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.GUEST,
  })
  role: Role;

  @OneToMany(() => Booking, (booking) => booking.Booking_ID)
  booking: Booking;

  @OneToMany(() => Guest, (guest) => guest.Owner_ID)
  guest: Guest;
}
