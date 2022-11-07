import {
  IsInt,
  Min,
  Max,
  IsDateString,
  IsMilitaryTime,
  IsEnum,
} from 'class-validator';
import { DaysOfWeek } from '../recurring-booking.entity';

export class RecurringBookingDto {
  @IsDateString()
  startDate: Date;

  @IsDateString()
  endDate: Date;

  @IsMilitaryTime()
  startTime: Date;

  @IsMilitaryTime()
  endTime: Date;

  @IsEnum(DaysOfWeek, { each: true })
  daysOfWeek: DaysOfWeek[];

  @Min(1)
  @Max(8)
  @IsInt()
  roomId: number;
}
