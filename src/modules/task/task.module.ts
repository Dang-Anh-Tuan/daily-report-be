import { TaskController } from './controllers/task.controller'
import { TaskService } from './services/task.service'
import { Module, forwardRef } from '@nestjs/common'
import { Task } from './entities/task.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TaskRepo } from './repositories/task.repository'
import { DailyReportModule } from '@modules/daily-report/daily-report.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]),
    forwardRef(() => DailyReportModule)
  ],
  controllers: [TaskController],
  providers: [TaskService, TaskRepo],
  exports: [TaskService, TaskRepo]
})
export class TaskModule {}
