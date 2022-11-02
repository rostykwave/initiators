import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class roomsQueryParseIntPipe implements PipeTransform {
  transform({ officeId, soonestBookingsDays }) {
    const officeIdNum = officeId ? Number.parseInt(officeId) : undefined;
    const soonestBookingsDaysNum = soonestBookingsDays
      ? Number.parseInt(soonestBookingsDays)
      : undefined;

    if (Number.isNaN(officeIdNum)) {
      throw new BadRequestException(
        'Request a valid "officeId" query parameter, type "number"',
      );
    }

    if (Number.isNaN(soonestBookingsDays)) {
      throw new BadRequestException(
        'Request a valid "soonestBookingsDays" query parameter, type "number"',
      );
    }

    return {
      officeId: officeIdNum,
      soonestBookingsDays: soonestBookingsDaysNum,
    };
  }
}
