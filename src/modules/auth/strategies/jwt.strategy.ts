import { appConfig, jwtConfig } from '@configs/configs.contants'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { MessageCode } from '@share/constants/common.constants'
import { responseError } from '@share/utils/response-schema'
import { ExtractJwt, Strategy } from 'passport-jwt'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConfig.secret,
      passReqToCallback: true
    })
  }

  /**
   * validation token request
   * @param req response for token request
   * @param payload data info of user
   * @returns
   */
  async validate(req: any, payload: any) {
    const url = req.originalUrl

    const urlNotCatchExpired = [
      `${appConfig.apiPrefix}/auth/logout`,
      `${appConfig.apiPrefix}/auth/refresh`
    ]

    if (!payload) {
      throw new UnauthorizedException(responseError(MessageCode.MSG_401_001))
    }
    if (
      new Date(payload.exp * 1000) < new Date() &&
      !urlNotCatchExpired.includes(url)
    ) {
      throw new UnauthorizedException(responseError(MessageCode.MSG_401_002))
    }

    return payload
  }
}
