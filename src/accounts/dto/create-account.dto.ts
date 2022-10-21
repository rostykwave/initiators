import { Role } from '../account.entity';

export class CreateAccountDto {
  id?: number;
  firstName?: string;
  lastName?: string;
  email: string;
  password?: string;
  approved?: boolean;
  role?: Role;
}
