import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  readonly email: string;
  @ApiProperty()
  readonly avatar: string;
  @ApiProperty()
  readonly avatarId: string;
  @IsNotEmpty()
  @ApiProperty()
  readonly firstName: string;
  @IsNotEmpty()
  @ApiProperty()
  readonly lastName: string;
  @IsNotEmpty()
  @ApiProperty()
  readonly gender: string;
  @ApiProperty()
  readonly phone: string;
  @ApiProperty()
  readonly roles: Array<string>;
  @IsNotEmpty()
  @ApiProperty()
  readonly password: string;
}
