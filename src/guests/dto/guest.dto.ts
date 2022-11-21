import { Role } from 'src/accounts/account.entity';

export class GuestDto {
  id: number;

  approved: boolean;

  role: Role;

  firstName: string;

  lastName: string;

  email: string;

  createdAt: Date;
}
