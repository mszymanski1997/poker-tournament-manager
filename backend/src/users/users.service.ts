import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from './schemas/user.schema';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async signIn(name: string, email: string, password: string) {
    const existingUser = await this.userModel.findOne({ email });

    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      name,
      email,
      password: hashedPassword,
    };

    const createdNewUser = new this.userModel(newUser);

    return createdNewUser.save();
  }

  async login(email: string, password: string) {
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload = { sub: user._id, email: user.email };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async deleteUser(id: string) {
    const deletedUser = await this.userModel.findByIdAndDelete(id);

    if (!deletedUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return {
      message: 'User successfully deleted',
      deletedUserId: deletedUser._id,
    };
  }

  async updateUser(id: string, attrs: UpdateUserDto) {
    const userToUpdate = await this.userModel.findById(id);

    if (!userToUpdate) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    if (attrs.password) {
      attrs.password = await bcrypt.hash(attrs.password, 10);
    }

    Object.assign(userToUpdate, attrs);

    return await userToUpdate.save();
  }
}
