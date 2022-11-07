import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateOneTimeBookingDto } from 'src/one-time-bookings/dto/create-one-time-booking.dto';
import { OneTimeBooking } from 'src/one-time-bookings/one-time-booking.entity';
import { OneTimeBookingsService } from 'src/one-time-bookings/one-time-bookings.service';
import { CreateRecurringBookingDto } from 'src/recurring-bookings/dto/create-recurring-booking.dto';
import { RecurringBooking } from 'src/recurring-bookings/recurring-booking.entity';
import { RecurringBookingsService } from 'src/recurring-bookings/recurring-bookings.service';
import { RoomsService } from 'src/rooms/rooms.service';
import { HttpException, HttpStatus } from '@nestjs/common';

@Controller('bookings')
@UseGuards(JwtAuthGuard)
export class BookingsController {
  constructor(
    private readonly oneTimeBookingsService: OneTimeBookingsService,
    private readonly recurringBookingsService: RecurringBookingsService,
    private readonly roomsService: RoomsService,
  ) {}

  @Post('one-time')
  async createOneTimeBooking(
    @Body() createOneTimeBookingDto: CreateOneTimeBookingDto,
    @Request() req,
  ): Promise<OneTimeBooking> {
    const doesRoomExists = await this.roomsService.findOneRoom(
      createOneTimeBookingDto.roomId,
    );

    if (!doesRoomExists) {
      throw new HttpException(
        `Room with id ${createOneTimeBookingDto.roomId} not found. Try another one.`,
        HttpStatus.NOT_FOUND,
      );
    }
    return await this.oneTimeBookingsService.create(
      createOneTimeBookingDto,
      req.user.id,
    );
  }

  @Post('recurring')
  async createRecurringBooking(
    @Body() createRecurringBookingDto: CreateRecurringBookingDto,
    @Request() req,
  ): Promise<RecurringBooking> {
    const doesRoomExists = await this.roomsService.findOneRoom(
      createRecurringBookingDto.roomId,
    );

    if (!doesRoomExists) {
      throw new HttpException(
        `Room with id ${createRecurringBookingDto.roomId} not found. Try another one.`,
        HttpStatus.NOT_FOUND,
      );
    }
    return this.recurringBookingsService.create(
      createRecurringBookingDto,
      req.user.id,
    );
  }
}
