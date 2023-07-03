/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Post } from '@nestjs/common'
import { LoginGoogleDto } from '../dtos/loginGoogle.dto'
import { AuthService } from '../services/auth.service'

@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login-google')
  loginGoogle(@Body() body: LoginGoogleDto) {
    console.log(body);
    
    this.authService.verifyGoogleToken(body.token)
  }
}
