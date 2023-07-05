import { IUser } from './../../user/interfaces/user.interface'
/*
https://docs.nestjs.com/providers#services
*/

import {
  BadRequestException,
  Injectable,
  NotFoundException,
  ForbiddenException
} from '@nestjs/common'
import { GoogleAuthService } from './google-auth.service'
import { responseError } from '@share/utils/response-schema'
import { MESSAGES, MessageCode } from '@share/constants/common.constants'
import { UserService } from '../../user/services/user.service'
import { UserGoogle } from '../interfaces/auth.interfaces'
import { UserRespDto } from '../dtos/loginGoogle.dto'
import { User } from '@modules/user/entities/user.entity'
import { TokenService } from './token.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly googleAuthService: GoogleAuthService,
    private readonly userService: UserService,
    private readonly tokenService: TokenService
  ) {}

  async loginGoogle(token) {
    // Check token
    if (!token) {
      throw new BadRequestException(
        responseError(MessageCode.MSG_400_002, {
          actionType: 'Token'
        })
      )
    }

    // Check user
    const user = await this.googleAuthService.verifyToken(token)
    if (!user) {
      throw new NotFoundException(
        responseError(MessageCode.MSG_404_002, {
          fieldName: 'User'
        })
      )
    }

    const userResp = await this.handleCheckUser(user)

    // create access token
    if (userResp) {
      const tokens = await this.tokenService.createToken({
        userId: userResp.id,
        email: userResp.email
      })

      return {
        message: MESSAGES.MSG_200,
        data: tokens
      }
    } else {
      throw new NotFoundException(
        responseError(MessageCode.MSG_404_002, {
          fieldName: 'User'
        })
      )
    }
  }

  async handleCheckUser(user: UserGoogle) {
    const email = user.email
    const userQuery = await this.userService.getUserByEmail(email, true)

    let userResp: User

    if (!userQuery) {
      userResp = await this.userService.create({
        email,
        avatar: user.picture
      })
    } else if (userQuery.deletedAt) {
      throw new ForbiddenException(responseError(MessageCode.MSG_403_001))
    } else {
      userResp = userQuery
    }

    return UserRespDto.plainToInstance(userResp)
  }
}
