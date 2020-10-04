import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  @IsEmail()
  @IsEmail()
  @ApiProperty()
  email: string;
  @IsNotEmpty()
  @ApiProperty()
  password: string
}
