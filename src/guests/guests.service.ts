import { Injectable } from '@nestjs/common';
import { AccountsService } from 'src/accounts/accounts.service';
import { GuestsRepository } from './guests.repository';

@Injectable()
export class GuestsService {
  constructor(
    private readonly guestsRepository: GuestsRepository,
    private readonly accountsService: AccountsService,
  ) {}
}
