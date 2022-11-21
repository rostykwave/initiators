import {
  IsInt,
  Min,
  IsDateString,
  IsMilitaryTime,
  Validate,
  IsArray,
  ArrayMinSize,
  MinLength,
  IsString,
} from 'class-validator';
import { IsBeforeConstraint } from 'src/recurring-bookings/dto/custom-validation-classes/IsBeforeConstraint';

export class UpdateOneTimeBookingDto {
  @MinLength(1)
  @IsString()
  title: string;

  @IsDateString()
  meetingDate: Date;

  @IsMilitaryTime()
  @Validate(IsBeforeConstraint, ['endTime'])
  startTime: Date;

  @IsMilitaryTime()
  endTime: Date;

  @Min(1)
  @IsInt()
  roomId: number;

  // Array of emails
  // Users that invited on current booking
  @IsArray()
  @ArrayMinSize(1)
  guests: string[];
}
