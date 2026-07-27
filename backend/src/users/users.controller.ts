import { Controller, Body, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/createUser.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('signin')
  async signIn(@Body() body: CreateUserDto) {
    const user = await this.usersService.signIn(
      body.name,
      body.email,
      body.password,
    );
    return user;
  }
}
