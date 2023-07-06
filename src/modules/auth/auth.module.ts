import { JwtModule, JwtService } from '@nestjs/jwt'
import { AuthController } from './controllers/auth.controller'
import { AuthService } from './services/auth.service'

/*
https://docs.nestjs.com/modules
*/

import { UserModule } from '@modules/user/user.module'
import { Module } from '@nestjs/common'
import { GoogleAuthService } from './services/google-auth.service'
import { TokenService } from './services/token.service'
import { PassportModule } from '@nestjs/passport'
import { jwtConfig } from '@configs/configs.contants'
import { JwtStrategy } from './strategies/jwt.strategy'

@Module({
  imports: [
    UserModule,
    PassportModule.register({
      defaultStrategy: 'jwt'
    }),
    JwtModule.register({
      secret: jwtConfig.secret,
      signOptions: {
        expiresIn: jwtConfig.expiresIn
      }
    })
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    GoogleAuthService,
    TokenService,
    JwtService,
    JwtStrategy
  ],
  exports: [AuthService]
})
export class AuthModule {}
