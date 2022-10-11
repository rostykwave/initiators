import { Booking } from 'src/bookings/booking.entity';
import { Room_Type } from 'src/room_type/room_type.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  Room_ID: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  maxPeople: number;

  @Column()
  minPeople: number;

  @OneToMany(() => Booking, (booking) => booking.Room_ID)
  booking: Booking;

  @ManyToOne(() => Room_Type, (room_type) => room_type.room)
  Type_ID: Room_Type;
}
