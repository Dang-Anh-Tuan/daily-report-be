import { UserService } from './services/user.service'
import { Module } from '@nestjs/common'
import { User } from './entities/user.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserRepo } from './repositories/user.repository'
import { UserController } from './controllers/user.controller'

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, UserRepo],
  exports: [UserService, UserRepo]
})
export class UserModule {}
