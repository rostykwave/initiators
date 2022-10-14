import { RecurringBooking } from '../recurringBookings/recurringBooking.entity';
import { Office } from '../offices/office.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { OneTimeBooking } from 'src/oneTimeBookings/oneTimeBooking.entity';

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  floor: number;

  @Column()
  description: string;

  @Column()
  maxPeople: number;

  @Column()
  minPeople: number;

  @OneToMany(() => OneTimeBooking, (oneTimeBooking) => oneTimeBooking.room)
  oneTimeBookings: OneTimeBooking[];

  @OneToMany(
    () => RecurringBooking,
    (recurringBooking) => recurringBooking.room,
  )
  recurringBookings: RecurringBooking[];

  @ManyToOne(() => Office, (office) => office.rooms)
  office: Office;
}
