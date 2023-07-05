/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common'
import { UserService } from '../../user/services/user.service'
import { IJwtPayload } from '../interfaces/auth.interfaces'
import { JwtService } from '@nestjs/jwt'
import { jwtConfig } from '@configs/configs.contants'

@Injectable()
export class TokenService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService
  ) {}

  /**
   * DESC: Generate token
   *
   * @param payload
   * @param refresh
   * @returns
   */
  async createToken(payload: IJwtPayload, refresh = true) {
    try {
      // Generate accessToken
      const accessToken = await this.jwtService.signAsync(payload, {
        secret: jwtConfig.secret,
        expiresIn: jwtConfig.expiresIn
      })
      
      

      // Generate refreshToken
      if (refresh) {
        const refreshToken = await this.jwtService.signAsync(payload, {
          secret: jwtConfig.secret,
          expiresIn: jwtConfig.refreshExpiresIn
        })

        
        // update refresh token to user
        await this.userService.updateRefreshToken(payload.userId, refreshToken)

        return {
          accessToken,
          refreshToken,
          expires_in: jwtConfig.expiresInSeconds
        }
      }
      return {
        accessToken
      }
    } catch (error) {}
  }
}
