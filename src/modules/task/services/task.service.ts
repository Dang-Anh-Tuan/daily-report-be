/*
https://docs.nestjs.com/providers#services
*/

import { Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common'
import { TaskRepo } from '../repositories/task.repository'
import {
  TaskCreate,
  TaskCreateRequest,
  TaskCreateUpdate
} from '../interfaces/task.interface'
import { DailyReportService } from '@modules/daily-report/services/daily-report.service'
import { responseError } from '@share/utils/response-schema'
import { MessageCode } from '@share/constants/common.constants'

@Injectable()
export class TaskService {
  constructor(
    private taskRepo: TaskRepo,
    @Inject(forwardRef(() => DailyReportService))
    private dailyReportService: DailyReportService
  ) {}

  async createTask(task: TaskCreate[]) {
    return await this.taskRepo.createMany(task)
  }

  async createTaskSingle(task: TaskCreateRequest) {
    const currentReport = await this.dailyReportService.getById(task.idReport)
    
    if(!currentReport) {
      throw new NotFoundException(
        responseError(MessageCode.MSG_404_002, {
          fieldName: 'Daily Report'
        })
      )
    }
    return await this.taskRepo.create({
      content: task.content,
      percent: task.percent,
      type: task.type,
      dailyReport: currentReport
    })
  }

  async updateTask(task: TaskCreateUpdate) {
    return await this.taskRepo.create(task)
  }
}
