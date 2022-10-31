import { OneTimeBooking } from 'src/oneTimeBookings/oneTimeBooking.entity';
import { Devices } from '../room.entity';
import { IRecurrentBooking } from './recurrentBooking.interface';

export interface IAllRoomsUpdated {
  id: number;
  name: string;
  floor: number;
  devices: Devices[];
  maxPeople: number;
  minPeople: number;
  soonestBookings: (IRecurrentBooking | OneTimeBooking)[];
}
