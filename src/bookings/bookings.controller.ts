import {
  Controller,
  Get,
  UseGuards,
  Request,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
  Post,
  HttpStatus,
  HttpException,
  Body,
} from '@nestjs/common';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateOneTimeBookingDto } from 'src/one-time-bookings/dto/create-one-time-booking.dto';
import { OneTimeBooking } from 'src/one-time-bookings/one-time-booking.entity';
import { OneTimeBookingsService } from 'src/one-time-bookings/one-time-bookings.service';
import { CreateRecurringBookingDto } from 'src/recurring-bookings/dto/create-recurring-booking.dto';
import { RecurringBooking } from 'src/recurring-bookings/recurring-booking.entity';
import { RecurringBookingsService } from 'src/recurring-bookings/recurring-bookings.service';
import { RoomsService } from 'src/rooms/rooms.service';
import { BookingsService } from './bookings.service';
import { IBookingsPagination } from './interfaces/bookings-pagination.interface';

@Controller('bookings')
@UseGuards(JwtAuthGuard)
export class BookingsController {
  constructor(
    private readonly oneTimeBookingsService: OneTimeBookingsService,
    private readonly recurringBookingsService: RecurringBookingsService,
    private readonly roomsService: RoomsService,
    private readonly bookingsService: BookingsService,
  ) {}

  @Get('own')
  async findAllOwnBookings(
    @Request() req,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(1), ParseIntPipe) limit: number,
  ): Promise<IBookingsPagination<OneTimeBooking>> {
    return this.bookingsService.findAllOwnBookings(req.user.id, page, limit);
  }

  @Get('one-time/own')
  async findAllOneTimeBookings(
    @Request() req,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(1), ParseIntPipe) limit: number,
  ): Promise<Pagination<OneTimeBooking>> {
    const options: IPaginationOptions = {
      page,
      limit,
    };
    return this.oneTimeBookingsService.findAllPaginate(req.user.id, options);
  }

  @Get('recurring/own')
  async findAllRecurringBookings(
    @Request() req,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(1), ParseIntPipe) limit: number,
  ): Promise<Pagination<RecurringBooking>> {
    const options: IPaginationOptions = {
      page,
      limit,
    };
    return this.recurringBookingsService.findAllPaginate(req.user.id, options);
  }

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
