import {
  Controller,
  Get,
  UseGuards,
  Request,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
  Post,
  HttpException,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { Role } from 'src/accounts/account.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { GuestsService } from 'src/guests/guests.service';
import { CreateOneTimeBookingDto } from 'src/one-time-bookings/dto/create-one-time-booking.dto';
import { UpdateOneTimeBookingDto } from 'src/one-time-bookings/dto/update-one-time-booking.dto';
import { OneTimeBooking } from 'src/one-time-bookings/one-time-booking.entity';
import { OneTimeBookingsService } from 'src/one-time-bookings/one-time-bookings.service';
import { CreateRecurringBookingDto } from 'src/recurring-bookings/dto/create-recurring-booking.dto';
import { UpdateRecurringBookingDto } from 'src/recurring-bookings/dto/update-recurring-booking.dto';
import { RecurringBooking } from 'src/recurring-bookings/recurring-booking.entity';
import { RecurringBookingsService } from 'src/recurring-bookings/recurring-bookings.service';
import { DeleteResult } from 'typeorm';
import { BookingsService } from './bookings.service';
import { BookingDto } from './dto/booking.dto';
import { findAllBookingsByOfficeIdInRangeDto } from './dto/find-all-bookings-by-office-id-in-range.dto';
import { ServiceException } from './exceptions/service.exception';
import { IBookingsInRange } from './interfaces/bookings-in-range.interface';
import { IBookingsPagination } from './interfaces/bookings-pagination.interface';

@Controller('bookings')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN, Role.USER)
export class BookingsController {
  constructor(
    private readonly oneTimeBookingsService: OneTimeBookingsService,
    private readonly recurringBookingsService: RecurringBookingsService,
    private readonly bookingsService: BookingsService,
  ) {}

  @Get('/')
  async findAllBookingsByOfficeIdInRange(
    @Query()
    { officeId, startDate, endDate }: findAllBookingsByOfficeIdInRangeDto,
  ): Promise<IBookingsInRange<BookingDto>> {
    return this.bookingsService.findAllBookingsByOfficeIdInRange(
      officeId,
      startDate,
      endDate,
    );
  }

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
    try {
      return await this.recurringBookingsService.create(
        createRecurringBookingDto,
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

  // Allows user updates only own one-time bookings and admin all one-time bookings
  @Put('one-time/:id')
  async updateOneTimeBooking(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateOneTimeBookingDto: UpdateOneTimeBookingDto,
    @Request() req,
  ): Promise<OneTimeBooking> {
    try {
      if (req.user.role !== Role.ADMIN) {
        return await this.oneTimeBookingsService.updateOwn(
          id,
          req.user.id,
          updateOneTimeBookingDto,
        );
      }
      return await this.oneTimeBookingsService.update(
        id,
        updateOneTimeBookingDto,
      );
    } catch (error) {
      if (error instanceof ServiceException) {
        throw new HttpException(error.message, 404);
      } else {
        throw error;
      }
    }
  }

  // Allows user deletes only own one-time bookings and admin all one-time bookings
  @Delete('one-time/:id')
  async deleteOneTimeBooking(
    @Param('id', ParseIntPipe) id: number,
    @Request() req,
  ): Promise<DeleteResult> {
    try {
      if (req.user.role !== Role.ADMIN) {
        return await this.oneTimeBookingsService.deleteOwn(id, req.user.id);
      }
      return await this.oneTimeBookingsService.delete(id);
    } catch (error) {
      if (error instanceof ServiceException) {
        throw new HttpException(error.message, 404);
      } else {
        throw error;
      }
    }
  }

  // Allows admin update all recurring bookings
  @Roles(Role.ADMIN)
  @Put('recurring/admin/:id')
  async updateRecurringBookingAdmin(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRecurringBookingDto: UpdateRecurringBookingDto,
  ): Promise<RecurringBooking> {
    try {
      return await this.recurringBookingsService.update(
        id,
        updateRecurringBookingDto,
      );
    } catch (error) {
      if (error instanceof ServiceException) {
        throw new HttpException(error.message, 404);
      } else {
        throw error;
      }
    }
  }

  // Allows user update only own recurring bookings
  @Roles(Role.USER)
  @Put('recurring/user/:id')
  async updateRecurringBookingUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRecurringBookingDto: UpdateRecurringBookingDto,
    @Request() req,
  ): Promise<RecurringBooking> {
    try {
      return await this.recurringBookingsService.updateOwn(
        id,
        req.user.id,
        updateRecurringBookingDto,
      );
    } catch (error) {
      if (error instanceof ServiceException) {
        throw new HttpException(error.message, 404);
      } else {
        throw error;
      }
    }
  }

  // Allows admin delete all recurring bookings
  @Roles(Role.ADMIN)
  @Delete('recurring/admin/:id')
  async deleteRecurringBookingAdmin(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<DeleteResult> {
    try {
      return await this.recurringBookingsService.delete(id);
    } catch (error) {
      if (error instanceof ServiceException) {
        throw new HttpException(error.message, 404);
      } else {
        throw error;
      }
    }
  }

  // Allows user delete only own one-time bookings
  @Roles(Role.USER)
  @Delete('recurring/user/:id')
  async deleteRecurringBookingUser(
    @Param('id', ParseIntPipe) id: number,
    @Request() req,
  ): Promise<DeleteResult> {
    try {
      return await this.recurringBookingsService.deleteOwn(id, req.user.id);
    } catch (error) {
      if (error instanceof ServiceException) {
        throw new HttpException(error.message, 404);
      } else {
        throw error;
      }
    }
  }
}
