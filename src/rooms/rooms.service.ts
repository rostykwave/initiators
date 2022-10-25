import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoomDto } from './dto/create-room.dto';
import { Room } from './room.entity';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
  ) {}

  async create(createRoomDto: CreateRoomDto): Promise<Room> {
    const Room = new Room();
    Room.name = createRoomDto.name;
    Room.floor = createRoomDto.floor;
    Room.description = createRoomDto.description;
    Room.maxPeople = createRoomDto.maxPeople;
    Room.minPeople = createRoomDto.minPeople;

    return this.roomRepository.save(Room);
  }

  //       async findAll(): Promise<Room[]> {
  //     return this.roomRepository.find();
  //   }

  //   async findOne(id: number): Promise<Room> {
  //     return this.roomRepository.findOneBy({ id });
}
