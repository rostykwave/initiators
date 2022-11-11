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
import { IsInTimeRange } from './custom-validation-classes/IsInTimeRange';

export class UpdateRecurringBookingDto {
  @IsDateString()
  @Validate(IsBeforeConstraint, ['endDate'])
  startDate: Date;

  @IsDateString()
  @Validate(IsInTimeRange, ['startDate'])
  endDate: Date;

  @IsMilitaryTime()
  @Validate(IsBeforeConstraint, ['endTime'])
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
