import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Get('users')
  getUsers() {
    return this.userService.getAllUsers();
  }

  @Get('active')
  getActiveUsersController() {
    return this.userService.getActiveUsers();
  }
}
