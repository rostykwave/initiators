import {
  validate,
  validateOrReject,
  Contains,
  IsInt,
  Length,
  IsEmail,
  IsFQDN,
  IsDate,
  Min,
  Max,
  IsString,
} from 'class-validator';

export class roomsQueryDto {
  // @IsInt()
  // @Max(3)
  @IsString()
  officeId?: number;

  // @IsInt()
  soonestBookingsDays?: number;
}
