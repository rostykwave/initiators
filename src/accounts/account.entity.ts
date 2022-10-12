import { Booking } from '../bookings/booking.entity';
import { Guest } from '../guests/guest.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

export enum Role {
  USER = 'User',
  ADMIN = 'Admin',
}

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

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
    default: Role.USER,
  })
  role: Role;

  @OneToMany(() => Booking, (booking) => booking.id)
  booking: Booking[];

  @OneToMany(() => Guest, (guest) => guest.id)
  guest: Guest[];
}
