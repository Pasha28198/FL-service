import { Injectable, UnauthorizedException, MethodNotAllowedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignOptions } from 'jsonwebtoken';
import * as moment from 'moment';
import * as bcrypt from 'bcrypt';
import * as _ from 'lodash';

import { UserService } from 'src/user/user.service';
import { TokenService } from 'src/token/token.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { CreateUserTokenDto } from 'src/token/dto/create-user-token.dto';
import { roleEnum } from '../user/enums/role.enum';
import { IReadableUserInterface } from '../user/interfaces/readable-user.interface';
import { ITokenPayloadInterface } from '../token/interfaces/token-payload.interface';
import { SignInDto } from './dto/signin.dto';
import { statusEnum } from '../user/enums/status.enum';
import { userSensitiveFieldsEnum } from '../user/dto/protected-fields.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) { }

  async signUp(createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto, [roleEnum.user]);
    //await this.sendConfirmation(user);
    return true;
  }

  async signIn({ email, password }: SignInDto): Promise<IReadableUserInterface> {
    const user = await (await this.userService.findByEmail(email));


    if (user && (await bcrypt.compare(password, user.password))) {
      const tokenPayload: ITokenPayloadInterface = {
        _id: user._id,
        roles: user.roles,
      };
      const token = await this.generateToken(tokenPayload);
      const expireAt = moment()
        .add(1, 'day')
        .toISOString();

      await this.saveToken({
        token,
        expireAt,
        uId: user._id,
      });

      const readableUser = user.toObject() as IReadableUserInterface;
      readableUser.accessToken = token;

      return _.omit<any>(readableUser, Object.values(userSensitiveFieldsEnum)) as IReadableUserInterface;
    }
    throw new BadRequestException('Invalid credentials');
  }


  private async generateToken(data, options?: SignOptions) : Promise<string>{
    return this.jwtService.sign(data, options);
  }

  private async verifyToken(token): Promise<any> {
    try {
      const data = this.jwtService.verify(token);
      const tokenExists = await this.tokenService.exists(data._id, token);

      if (tokenExists) {
        return data;
      }

      throw new UnauthorizedException();
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  private async saveToken(createUserTokenDto: CreateUserTokenDto) {

    return await this.tokenService.create(createUserTokenDto);
  }

  // async sendConfirmation(user: IUser) {
  //   const expiresIn = 60 * 60 * 24;
  //   const tokenPayload = {
  //     _id: user._id,
  //     //status: user.status,
  //     roles: user.roles
  //   }
  //   const expire = moment().add(1, 'day').toISOString();
  //
  //   const token = await this.generateToken(tokenPayload, { expiresIn });
  //   const confirmLink = `${this.clientAppUrl}/auth/confirm?token=${token}`;
  //
  //   //#TODO code for mail gun service
  // }
}
