import {
  IsInt,
  Min,
  IsDateString,
  IsMilitaryTime,
  IsEnum,
  ArrayUnique,
} from 'class-validator';
import { DaysOfWeek } from '../recurring-booking.entity';

export class CreateRecurringBookingDto {
  @IsDateString()
  startDate: Date;

  @IsDateString()
  endDate: Date;

  @IsMilitaryTime()
  startTime: Date;

  @IsMilitaryTime()
  endTime: Date;

  @ArrayUnique()
  @IsEnum(DaysOfWeek, { each: true })
  daysOfWeek: DaysOfWeek[];

  @Min(1)
  @IsInt()
  roomId: number;
}
