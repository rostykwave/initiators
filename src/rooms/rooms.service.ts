import { Injectable } from '@nestjs/common';
import { RoomRepository } from './rooms.repository';

@Injectable()
export class RoomsService {
  constructor(private readonly roomRepository: RoomRepository) {}

  async findAllRooms(
    officeId: number,
    soonestBookingsDays: number,
  ): Promise<any> {

    // const startDate = new Date();
    // const endDate = new Date('2022.10.30');
    // const startDay = startDate.getDay();
    // const Difference_In_Time = endDate.getTime() - startDate.getTime();
    // const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    // console.log(startDate);
    // console.log('endDate', endDate);
    // console.log(startDay);
    // console.log('Difference_In_Days', Difference_In_Days);
    // console.log('Difference_In_Days', Math.floor(Difference_In_Days));
    // const daysOfWeek = ['Monday', 'Friday'];
    // const numberDayOfWeek = [1, 5];

    // const newArray = [];

    // newArray.push(startDay);
    // for (let i = 0; i < Math.floor(Difference_In_Days); i++) {
    //   newArray.push(newArray[i] + 1);
    // }
    // console.log('newArray', newArray);
    //MAP????
    ///a set of date??
    //transform reccuring booking to an array of oneTimeBookings

    // const result = {
    //   4: startDate,
    //   5: new Date(startDate.setDate(startDate.getDate() + 1)),
    //   6: startDate.getDate() + 1,
    // };

    // console.log('result', result);

    // const date = new Date('2022.10.31');
    // console.log('date1', date);
    // date.setDate(date.getDate() + 1);
    // console.log('date2', date);
    // const dateMapByWeekDay = new Map();
    // dateMapByWeekDay.set('5', startDate);
    // console.log('dateMapByWeekDay', dateMapByWeekDay);

    ///
    return await this.roomRepository.findAllRooms(
      officeId,
      soonestBookingsDays,
    );
  }
}
