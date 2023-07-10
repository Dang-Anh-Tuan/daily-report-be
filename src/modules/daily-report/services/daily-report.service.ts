/*
https://docs.nestjs.com/providers#services
*/

import {
  Inject,
  Injectable,
  NotFoundException,
  forwardRef
} from '@nestjs/common'
import { DailyReportRepo } from '../repositories/daily-report.repository'
import { UserService } from '@modules/user/services/user.service'
import {
  convertDailyReportToResp,
  convertDate,
  generateHeaderDefault
} from '@share/utils/share-function'
import { DailyReport } from '../entities/daily-report.entity'
import { TYPE_TASK, TaskCreate } from '@modules/task/interfaces/task.interface'
import { TaskService } from '@modules/task/services/task.service'
import { RequestReportUpdate } from '../interfaces/daily-report.interface'
import { responseError } from '@share/utils/response-schema'
import { MessageCode } from '@share/constants/common.constants'
import { User } from '@modules/user/entities/user.entity'
import { Task } from '@modules/task/entities/task.entity'

@Injectable()
export class DailyReportService {
  constructor(
    private readonly dailyReportRepo: DailyReportRepo,
    private userService: UserService,
    @Inject(forwardRef(() => TaskService))
    private taskService: TaskService
  ) {}

  getNewPlanTaskFromOldReport(nearestDailyReport: DailyReport) {
    return nearestDailyReport.tasks.filter(
      (task) =>
        [TYPE_TASK.NEXT_DAY_PLAN, TYPE_TASK.ISSUE].includes(task.type) ||
        (TYPE_TASK.ACTUAL === task.type && task.percent !== 100)
    )
  }

  getPlanTaskNotRepeatContent(
    taskTodayPlan: Task[],
    newDailyReport: DailyReport
  ) {
    const taskMap: { [content: string]: TaskCreate } = {}

    for (const task of taskTodayPlan) {
      const { content, percent, type } = task

      if (!(content in taskMap)) {
        taskMap[content] = {
          content,
          percent,
          type: TYPE_TASK.TODAY_PLAN,
          dailyReport: newDailyReport
        }
      }
      if (type === TYPE_TASK.ACTUAL) {
        taskMap[content].percent = percent
      }
    }

    return Object.values(taskMap)
  }

  async createNewReportFromOldReport(
    currentUser: User,
    nearestDailyReport: DailyReport
  ) {
    // *** header same nearestDailyReport
    // *** nearestDailyReport's next day plan become newDailyReport's today plan
    // *** nearestDailyReport's actual not in nearestDailyReport's next day plan if percent not equal 100 => newDailyReport's today plan
    // *** nearestDailyReport's actual not in nearestDailyReport's next day plan if percent not equal 100 => newDailyReport's today actual and hold percent
    const newDailyReportData = {
      heading: generateHeaderDefault(currentUser.email, new Date()),
      user: currentUser
    }

    const newDailyReport = await this.dailyReportRepo.create(newDailyReportData)

    const taskTodayPlan = this.getNewPlanTaskFromOldReport(nearestDailyReport)

    const convertedTasks: TaskCreate[] = this.getPlanTaskNotRepeatContent(
      taskTodayPlan,
      newDailyReport
    )

    await this.taskService.createTask(convertedTasks)
  }

  async getCurrentDailyReport(idUser: number) {
    const nearestDailyReport =
      await this.dailyReportRepo.getNearestDailyReportByUserId(idUser)

    const currentUser = await this.userService.getById(idUser)

    if (!currentUser) {
      throw new NotFoundException(
        responseError(MessageCode.MSG_404_002, {
          fieldName: 'User'
        })
      )
    }

    // *** Case 1: User don't have any daily report
    if (!nearestDailyReport) {
      const newDailyReport = await this.dailyReportRepo.create({
        heading: generateHeaderDefault(currentUser.email, new Date()),
        user: currentUser
      })

      return convertDailyReportToResp(newDailyReport as DailyReport)
    }

    // *** Case 2: User have nearestDailyReport'createAt not same current day
    if (
      nearestDailyReport &&
      convertDate(nearestDailyReport.createdAt) !== convertDate(new Date())
    ) {
      await this.createNewReportFromOldReport(currentUser, nearestDailyReport)

      return convertDailyReportToResp(
        await this.dailyReportRepo.getNearestDailyReportByUserId(idUser)
      )
    }

    return convertDailyReportToResp(nearestDailyReport)
  }

  async updateReport(data: RequestReportUpdate) {
    this.dailyReportRepo.create(data)
  }

  async getById(id: number) {
    return await this.dailyReportRepo.findOne({ id })
  }
}
