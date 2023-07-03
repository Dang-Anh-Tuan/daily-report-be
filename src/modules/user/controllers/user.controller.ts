/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, Post } from '@nestjs/common'
import { UserService } from '../services/user.service'
import { UserCreateDto } from '../dtos/user.dto';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAllUser() {
    return this.userService.getAll()
  }

  @Post()
  createUser(@Body() body: UserCreateDto) {
    console.log(body);
    this.userService.create(body)
  }
}
