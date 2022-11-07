import {
  IsInt,
  Min,
  IsDateString,
  IsMilitaryTime,
  IsEnum,
  ArrayUnique,
  Validate,
} from 'class-validator';
import { DaysOfWeek } from '../recurring-booking.entity';
import { IsBeforeConstraint } from './custom-validation-classes/IsBeforeConstraint';

export class CreateRecurringBookingDto {
  @IsDateString()
  @Validate(IsBeforeConstraint, ['endDate'])
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
