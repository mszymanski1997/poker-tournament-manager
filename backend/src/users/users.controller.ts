import {
  Controller,
  Body,
  Post,
  Delete,
  Patch,
  Get,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('signup')
  async signup(@Body() body: CreateUserDto) {
    const user = await this.usersService.signup(
      body.userName,
      body.email,
      body.password,
    );
    return user;
  }

  @Post('login')
  async login(@Body() body: LoginUserDto) {
    return this.usersService.login(body.email, body.password);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getUser(@CurrentUser('sub') id: string) {
    return this.usersService.findUser(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('me')
  async deleteUser(@CurrentUser('sub') id: string) {
    return this.usersService.deleteUser(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('me')
  async updateUser(
    @CurrentUser('sub') id: string,
    @Body() body: UpdateUserDto,
  ) {
    return this.usersService.updateUser(id, body);
  }
}
