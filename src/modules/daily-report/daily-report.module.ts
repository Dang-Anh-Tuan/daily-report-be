import { DailyReportService } from './services/daily-report.service'
import { DailyReportController } from './controllers/daily-report.controller'
import { Module, forwardRef } from '@nestjs/common'
import { DailyReport } from './entities/daily-report.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DailyReportRepo } from './repositories/daily-report.repository'
import { UserModule } from '@modules/user/user.module'
import { TaskModule } from '@modules/task/task.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([DailyReport]),
    UserModule,
    forwardRef(() => TaskModule)
  ],
  controllers: [DailyReportController],
  providers: [DailyReportService, DailyReportRepo],
  exports: [DailyReportService, DailyReportRepo]
})
export class DailyReportModule {}
