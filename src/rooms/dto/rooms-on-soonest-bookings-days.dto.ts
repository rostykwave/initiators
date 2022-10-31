import { Type } from 'class-transformer';
import { IsInt, Min, Max } from 'class-validator';

export class roomsOnSoonestBookingsDaysDto {
  @Min(1)
  @Max(3)
  @IsInt()
  @Type(() => Number)
  officeId?: number;

  @IsInt()
  @Type(() => Number)
  soonestBookingsDays?: number;
}
