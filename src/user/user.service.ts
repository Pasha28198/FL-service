import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import * as _ from 'lodash';

import { IReadableUserInterface } from './interfaces/readable-user.interface';
import { IUser } from './interfaces/user.interface';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { userSensitiveFieldsEnum } from './dto/protected-fields.enum'

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<IUser>) {}

  async create(createUserDto: CreateUserDto, roles: Array<string>): Promise<IUser> {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(createUserDto.password, salt);

    const createdUser = new this.userModel(_.assignIn(createUserDto, { password: hash, roles }));
    return await createdUser.save();
  }

  async find(id: string): Promise<IReadableUserInterface> {
    const user = await this.userModel.findById(id).exec();
    const readableUser = user.toObject() as IReadableUserInterface;
    return _.omit<any>(readableUser, Object.values(userSensitiveFieldsEnum)) as IReadableUserInterface
  }

  async findByEmail(email: string): Promise<IUser> {
    return await this.userModel.findOne({ email }).exec();
  }
}
