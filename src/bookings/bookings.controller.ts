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
import { Role } from 'src/accounts/account.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { CreateOneTimeBookingDto } from 'src/one-time-bookings/dto/create-one-time-booking.dto';
import { OneTimeBooking } from 'src/one-time-bookings/one-time-booking.entity';
import { OneTimeBookingsService } from 'src/one-time-bookings/one-time-bookings.service';
import { CreateRecurringBookingDto } from 'src/recurring-bookings/dto/create-recurring-booking.dto';
import { RecurringBooking } from 'src/recurring-bookings/recurring-booking.entity';
import { RecurringBookingsService } from 'src/recurring-bookings/recurring-bookings.service';
import { RoomsService } from 'src/rooms/rooms.service';
import { BookingsService } from './bookings.service';
import { BookingDto } from './dto/booking.dto';
import { ServiceException } from './exceptions/service.exception';
import { IBookingsPagination } from './interfaces/bookings-pagination.interface';

@Controller('bookings')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN, Role.USER)
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
  ): Promise<IBookingsPagination<BookingDto>> {
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
    try {
      return await this.oneTimeBookingsService.create(
        createOneTimeBookingDto,
        req.user.id,
      );
    } catch (error) {
      if (error instanceof ServiceException) {
        throw new HttpException(error.message, 404);
      } else {
        throw error;
      }
    }
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
