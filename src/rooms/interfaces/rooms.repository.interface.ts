import { Room } from '../room.entity';

export interface IRoomsRepository {
  findAllRooms(officeId: number, soonestBookingsDays: number): Promise<Room[]>;
}
