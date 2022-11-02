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

export enum Devices {
  WhiteBoard = 'White board',
  BigScreen = 'Big screen',
  WaterCooler = 'Water cooler',
  PlayStation = 'PlayStation',
  AirConditioner = 'Air conditioner',
  SoundSystem = 'Sound system',
  TennisTable = 'Tennis table',
  Camera = 'Camera',
}

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  floor: number;

  @Column({
    type: 'enum',
    enum: Devices,
    array: true,
    nullable: true,
  })
  devices: Devices[];

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
