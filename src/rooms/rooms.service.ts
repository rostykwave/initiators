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

  // async create(createRoomDto: CreateRoomDto): Promise<Room> {
  async create(createRoomDto: CreateRoomDto) {
    // const room = new Room();
    // room.name = createRoomDto.name;
    // room.floor = createRoomDto.floor;
    // room.description = createRoomDto.description;
    // room.maxPeople = createRoomDto.maxPeople;
    // room.minPeople = createRoomDto.minPeople;
    // room.office.id = createRoomDto.officeId;
    // return this.roomRepository.save(room);

    const room = this.roomRepository.create(createRoomDto);
    await this.roomRepository.save(room);
  }

  //       async findAll(): Promise<Room[]> {
  //     return this.roomRepository.find();
  //   }

  //   async findOne(id: number): Promise<Room> {
  //     return this.roomRepository.findOneBy({ id });
}
