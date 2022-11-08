import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'IsInTimeRange', async: false })
export class IsInTimeRange implements ValidatorConstraintInterface {
  private daysLimit = process.env.INTERVAL_RECURRING_BOOKING_IN_DAYS || 30;

  validate(propertyValue: string, args: ValidationArguments) {
    const endDate = new Date(`${propertyValue}`).getTime();
    const startDate = new Date(`${args.object[args.constraints[0]]}`).getTime();

    const daysBetweenTwoDates = (endDate - startDate) / 86400000;

    return daysBetweenTwoDates <= this.daysLimit;
  }

  defaultMessage() {
    return `Difference between startDate and endDate must be less than ${this.daysLimit} days`;
  }
}
