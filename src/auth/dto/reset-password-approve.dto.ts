import { IsEmail, MinLength, IsString } from 'class-validator';

export class ResetPasswordApproveDto {
  @IsEmail()
  email: string;

  @MinLength(1)
  @IsString()
  newPassword: string;
}
