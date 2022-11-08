import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { IFindAllByOfficeId } from './interfaces/find-all-by-officeId.interface';
import { RoomsService } from './rooms.service';
import { roomsOnSoonestBookingsDaysDto } from './dto/rooms-on-soonest-bookings-days.dto';
import { roomsQueryParseIntPipe } from './pipes/queryParseInt.pipe';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/accounts/account.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('rooms')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN, Role.USER)
export class RoomsController {
  constructor(private roomsService: RoomsService) {}

  @Get()
  async findAllByOfficeId(
    @Query(roomsQueryParseIntPipe)
    { officeId, soonestBookingsDays }: roomsOnSoonestBookingsDaysDto,
  ): Promise<IFindAllByOfficeId> {
    const allRoomsUpdated = await this.roomsService.findAllRooms(
      officeId,
      soonestBookingsDays,
    );

    return {
      data: {
        rooms: allRoomsUpdated,
      },
    };
  }
}
