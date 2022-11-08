import { BookingDto } from 'src/bookings/dto/booking.dto';
import { Devices } from '../room.entity';

export interface IAllRoomsUpdated {
  id: number;
  name: string;
  floor: number;
  devices: Devices[];
  maxPeople: number;
  minPeople: number;
  soonestBookings: BookingDto[];
}
