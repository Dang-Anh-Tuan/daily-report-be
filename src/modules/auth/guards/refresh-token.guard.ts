import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { MessageCode } from '@share/constants/common.constants'
import { responseError } from '@share/utils/response-schema'
import { UserService } from '../../user/services/user.service'
import { TokenService } from '../services/token.service'

@Injectable()
export class JwtRefreshGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private tokenService: TokenService
  ) {}

  async canActivate(context: ExecutionContext): Promise<any> {
    const request = context.switchToHttp().getRequest()
    const token = request.headers.authorization?.replace('Bearer ', '')

    if (!token) {
      throw new UnauthorizedException('Missing token')
    }

    const payload = this.jwtService.decode(token)

    const { userId, email } = payload as { userId: number; email: string }
    const user = await this.userService.getUserByEmail(email)

    if (!user) {
      throw new NotFoundException(
        responseError(MessageCode.MSG_404_002, {
          fieldName: 'User'
        })
      )
    }

    const tokenGenerate = await this.tokenService.createToken({
      userId,
      email
    })

    if (tokenGenerate.refreshToken) {
      this.userService.updateRefreshToken(userId, tokenGenerate.refreshToken)
    }

    request.user = tokenGenerate
    return tokenGenerate
  }
}
