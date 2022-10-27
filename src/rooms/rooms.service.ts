import { Injectable } from '@nestjs/common';
import { RoomRepository } from './rooms.repository';

@Injectable()
export class RoomsService {
  constructor(private readonly roomRepository: RoomRepository) {}

  async findAllRoomsWithBookings(
    officeId: number,
    soonestBookingsDays: string,
  ): Promise<any> {
    return await this.roomRepository.findAllRooms(
      officeId,
      soonestBookingsDays,
    );
  }
}
