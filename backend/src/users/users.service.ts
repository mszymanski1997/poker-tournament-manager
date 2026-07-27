import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async signIn(name: string, email: string, password: string) {
    const newUser = {
      name,
      email,
      password,
      tournaments: [],
    };

    const createdNewUser = new this.userModel(newUser);

    return createdNewUser.save();
  }

  async login() {}

  async logout() {}
}
