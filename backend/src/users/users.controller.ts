import { Controller, Body, Post, Delete, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';

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

  @Post('login')
  async login(@Body() body: LoginUserDto) {
    return this.usersService.login(body.email, body.password);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return  this.usersService.deleteUser(id);
  }
}
