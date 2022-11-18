import { IsEmail, MinLength, IsString } from 'class-validator';

export class ChangePasswordDto {
  @IsEmail()
  email: string;

  @MinLength(1)
  @IsString()
  oldPassword: string;

  @MinLength(1)
  @IsString()
  newPassword: string;
}
