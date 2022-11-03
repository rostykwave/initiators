import { OneTimeBooking } from 'src/one-time-bookings/one-time-booking.entity';
import { Devices } from '../room.entity';
import { IOneOfRecurrentBooking } from './one-of-recurrent-booking.interface';

export interface IAllRoomsUpdated {
  id: number;
  name: string;
  floor: number;
  devices: Devices[];
  maxPeople: number;
  minPeople: number;
  soonestBookings: (IOneOfRecurrentBooking | OneTimeBooking)[];
}
