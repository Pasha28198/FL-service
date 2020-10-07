import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { GetUser } from 'src/components/decorators/get-users.decorator';
import { IUser } from 'src/user/interfaces/user.interface';
import { Roles } from 'src/components/decorators/roles.decorator';
import { RolesGuard } from 'src/components/guards/roles.guard';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Roles('admin')
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
