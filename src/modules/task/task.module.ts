import { TaskController } from './controllers/task.controller'
import { TaskService } from './services/task.service'
import { Module } from '@nestjs/common'
import { Task } from './entities/task.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TaskRepo } from './repositories/task.repository'

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  controllers: [TaskController],
  providers: [TaskService, TaskRepo],
  exports: [TaskService, TaskRepo]
})
export class TaskModule {}
