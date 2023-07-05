import { databaseConfig } from '@configs/configs.contants'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import { AppService } from './app.service'
import { AuthModule } from './modules/auth/auth.module'
import { DailyReportModule } from './modules/daily-report/daily-report.module'
import { TaskModule } from './modules/task/task.module'
import { UserModule } from './modules/user/user.module'

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
  providers: [AppService]
})
export class AppModule {}
