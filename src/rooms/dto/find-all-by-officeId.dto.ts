// import {
//   validate,
//   validateOrReject,
//   Contains,
//   IsInt,
//   Length,
//   IsEmail,
//   IsFQDN,
//   IsDate,
//   Min,
//   Max,
// } from 'class-validator';
import { IAllRoomsUpdated } from '../interfaces/allRoomsUpdated.interface';

export class FindAllByOfficeIdDto {
  data: {
    rooms: IAllRoomsUpdated[];
  };
}
