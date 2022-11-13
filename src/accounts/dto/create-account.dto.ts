import { IsEmail, MinLength, IsString } from 'class-validator';

export class CreateAccountDto {
  id?: number;

  @MinLength(1)
  @IsString()
  firstName: string;

  @MinLength(1)
  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
