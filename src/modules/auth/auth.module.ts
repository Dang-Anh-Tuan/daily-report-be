import { AuthService } from './services/auth.service'
import { AuthController } from './controllers/auth.controller'
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common'

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule {}
