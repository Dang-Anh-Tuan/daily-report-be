/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common'
import { UserRepo } from '../repositories/user.repository'
import { IUserCreate } from '../interfaces/user.interface'

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepo) {}

  getUserByEmail(email: string) {
    return this.userRepo.findOne({ email: email })
  }

  getAll() {
    return this.userRepo.getList({})
  }

  create(user: IUserCreate) {
    return this.userRepo.create(user)
  }
}
