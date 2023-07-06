/*
https://docs.nestjs.com/controllers#controllers
*/
import { ExecutionContext } from '@nestjs/common'
import { User } from '@modules/user/entities/user.entity'
import { UserService } from '@modules/user/services/user.service'
import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common'
import { LoginGoogleDto, UserRespDto } from '../dtos/loginGoogle.dto'
import { JwtAuthGuard } from '../guards/jwt-auth.guard'
import { JwtRefreshGuard } from '../guards/refresh-token.guard'
import { AuthService } from '../services/auth.service'
import { CanActivateResult } from '@share/decorator'

@Controller('/auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  @Post('/login-google')
  async loginGoogle(@Body() body: LoginGoogleDto) {
    return this.authService.loginGoogle(body.token)
  }

  @UseGuards(JwtAuthGuard)
  @Get('/user')
  async getCurrentUser(@Request() req) {
    const email = req.user.email
    const user: User = await this.userService.getUserByEmail(email)
    return UserRespDto.plainToInstance(user)
  }

  @UseGuards(JwtAuthGuard)
  @Get('/logout')
  async logout(@Request() req) {
    const id = req.user.userId
    await this.userService.clearRefreshToken(id)
    return true
  }

  @UseGuards(JwtRefreshGuard)
  @Post('/refresh')
  async refreshToken(
    @CanActivateResult() newCredential
  ) {
    return newCredential
  }
}
