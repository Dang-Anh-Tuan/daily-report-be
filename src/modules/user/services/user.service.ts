/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, NotFoundException } from '@nestjs/common'
import { UserRepo } from '../repositories/user.repository'
import { IUserCreate } from '../interfaces/user.interface'
import { responseError } from '@share/utils/response-schema'
import { MessageCode } from '@share/constants/common.constants'

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepo) {}

  getUserByEmail(email: string, withDeletedAt = false) {
    const user = this.userRepo.findOne({ email: email }, withDeletedAt)
    if(!user) {
      throw new NotFoundException(
        responseError(MessageCode.MSG_404_002, {
          fieldName: 'User'
        })
      )
    }
    return user
  }
  


  getAll() {
    return this.userRepo.getList({})
  }

  create(user: IUserCreate) {
    return this.userRepo.create(user)
  }

  async updateRefreshToken(
    userId: number,
    refreshToken: string
  ): Promise<void> {
    await this.userRepo.create({ id: userId, refreshToken })
  }
  
  async clearRefreshToken(userId: number,
  ): Promise<void> {
    await this.userRepo.create({ id: userId, refreshToken: null })
  }
}
