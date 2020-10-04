import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { SignInDto } from './dto/signin.dto';
import { IReadableUserInterface } from '../user/interfaces/readable-user.interface';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor( private readonly authService: AuthService) {}

  @Post('/signUp')
  async signUp(@Body(new ValidationPipe()) createUserDto: CreateUserDto): Promise<boolean> {
    return await this.authService.signUp(createUserDto)
  }

  @Post('/singIn')
  async signIn(@Body(new ValidationPipe()) signInDto: SignInDto): Promise<IReadableUserInterface> {
    return await this.authService.signIn(signInDto);
  }
}
