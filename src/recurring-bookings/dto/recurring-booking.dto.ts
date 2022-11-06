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
  // id?: number;

  // @IsDateString()
  // createdAt: Date;

  @IsDateString()
  startDate: Date;

  @IsDateString()
  endDate: Date;

  // @Matches(/(?:[01]\d|2[0123]):(?:[012345]\d):(?:[012345]\d)/gm)
  @IsMilitaryTime()
  startTime: Date;

  // @Matches(/(?:[01]\d|2[0123]):(?:[012345]\d):(?:[012345]\d)/gm)
  @IsMilitaryTime()
  endTime: Date;

  @IsEnum(DaysOfWeek, { each: true })
  daysOfWeek: DaysOfWeek[];

  @Min(1)
  @Max(8)
  @IsInt()
  roomId: number;
}
