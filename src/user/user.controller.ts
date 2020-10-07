import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { GetUser } from 'src/components/decorators/get-users.decorator';
import { IUser } from 'src/user/interfaces/user.interface';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    console.log();
    return 'work'
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('/info')
  async info(@GetUser() user: IUser) {    
    return await this.userService.find(user._id);
  }
}
