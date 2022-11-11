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
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { Role } from 'src/accounts/account.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { CreateOneTimeBookingDto } from 'src/one-time-bookings/dto/create-one-time-booking.dto';
import { UpdateOneTimeBookingDto } from 'src/one-time-bookings/dto/update-one-time-booking.dto';
import { OneTimeBooking } from 'src/one-time-bookings/one-time-booking.entity';
import { OneTimeBookingsService } from 'src/one-time-bookings/one-time-bookings.service';
import { CreateRecurringBookingDto } from 'src/recurring-bookings/dto/create-recurring-booking.dto';
import { UpdateRecurringBookingDto } from 'src/recurring-bookings/dto/update-recurring-booking.dto';
import { RecurringBooking } from 'src/recurring-bookings/recurring-booking.entity';
import { RecurringBookingsService } from 'src/recurring-bookings/recurring-bookings.service';
import { RoomsService } from 'src/rooms/rooms.service';
import { DeleteResult } from 'typeorm';
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

  // Allows admin update all one-time bookings
  @Roles(Role.ADMIN)
  @Put('one-time/admin/:id')
  async updateOneTimeBookingAdmin(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateOneTimeBookingDto: UpdateOneTimeBookingDto,
  ): Promise<OneTimeBooking> {
    try {
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

  // Allows user update only own one-time bookings
  @Roles(Role.USER)
  @Put('one-time/user/:id')
  async updateOneTimeBookingUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateOneTimeBookingDto: UpdateOneTimeBookingDto,
    @Request() req,
  ): Promise<OneTimeBooking> {
    try {
      return await this.oneTimeBookingsService.updateOwn(
        id,
        req.user.id,
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

  // Allows admin delete all one-time bookings
  @Roles(Role.ADMIN)
  @Delete('one-time/admin/:id')
  async deleteOneTimeBookingAdmin(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<DeleteResult> {
    try {
      return await this.oneTimeBookingsService.delete(id);
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
  @Delete('one-time/user/:id')
  async deleteOneTimeBookingUser(
    @Param('id', ParseIntPipe) id: number,
    @Request() req,
  ): Promise<DeleteResult> {
    try {
      return await this.oneTimeBookingsService.deleteOwn(id, req.user.id);
    } catch (error) {
      if (error instanceof ServiceException) {
        throw new HttpException(error.message, 404);
      } else {
        throw error;
      }
    }
  }

  @Put('recurring/:id')
  async updateRecurringBooking(
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

  @Delete('recurring/:id')
  async deleteRecurringBooking(
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
}
