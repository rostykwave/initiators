import { Role } from 'src/accounts/account.entity';

export class OwnerDto {
  id: number;

  approved: boolean;

  role: Role;

  firstName: string;

  lastName: string;

  email: string;

  createdAt: Date;
}
