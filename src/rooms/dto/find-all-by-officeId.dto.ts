import { Devices } from '../room.entity';

export class FindAllByOfficeIdDto {
  data: {
    rooms: {
      id: number;
      name: string;
      floor: number;
      devices: Devices[];
      maxPeople: number;
      minPeople: number;
      soonestBookings: {
        id: number | string;
        createdAt: string;
        meetingDate: string;
        startTime: string;
        endTime: string;
      }[];
    }[];
  };
}
