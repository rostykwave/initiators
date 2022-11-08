import { OneTimeBooking } from 'src/one-time-bookings/one-time-booking.entity';
import { Devices } from '../room.entity';

export interface IAllRoomsUpdated {
  id: number;
  name: string;
  floor: number;
  devices: Devices[];
  maxPeople: number;
  minPeople: number;
  soonestBookings: OneTimeBooking[];
}
