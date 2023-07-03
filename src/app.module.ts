import { AuthModule } from './modules/auth/auth.module'
import { TaskModule } from './modules/task/task.module'
import { DailyReportModule } from './modules/daily-report/daily-report.module'
import { UserModule } from './modules/user/user.module'
import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { databaseConfig } from '@configs/configs.contants'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'

@Module({
  imports: [
    AuthModule,
    TaskModule,
    DailyReportModule,
    UserModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: databaseConfig.host,
      port: parseInt(databaseConfig.port),
      username: databaseConfig.username,
      password: databaseConfig.password,
      database: databaseConfig.database,
      autoLoadEntities: Boolean(databaseConfig.autoLoadEntities),
      synchronize: Boolean(databaseConfig.synchronize),
      namingStrategy: new SnakeNamingStrategy()
    }),
    UserModule,
    DailyReportModule,
    TaskModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
