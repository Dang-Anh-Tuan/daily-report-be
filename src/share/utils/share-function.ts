import { DailyReport } from '@modules/daily-report/entities/daily-report.entity'
import { GroupTasks } from '@modules/daily-report/interfaces/daily-report.interface'
import { TaskResp } from '@modules/task/dtos/task.dto'
import { Task } from '@modules/task/entities/task.entity'
import { TYPE_TASK } from '@modules/task/interfaces/task.interface'

export interface IObject<T = unknown> {
  [key: string]: T
}

/**
 * process data input format string
 * @param strInput data input type string
 * @param obj
 * @param prefixObjStr
 * @returns
 */
export const formatStringObj = (
  strInput: string,
  obj?: IObject<any>,
  prefixObjStr = ''
) => {
  if (!obj) {
    return strInput
  }
  let str = strInput
  Object.keys(obj).forEach((key) => {
    if (obj[key]) {
      if (typeof obj[key] === 'object' && !(obj[key] instanceof Array)) {
        str = formatStringObj(str, obj[key], `${key}.`)
      }
      str = str.replace(
        new RegExp(`<<${prefixObjStr}${key}>>`, 'g'),
        obj[key].toString()
      )
    }
  })

  return str
}

// *** Example : tuanda2@vmogroup.com => tuanda2
export const shortenEmail = (email: string): string => {
  const extendEmailReg = /@vmogroup.com/g
  return email.replace(extendEmailReg, '')
}

export const convertDate = (date: Date): string => {
  const day = date.getUTCDate().toString().padStart(2, '0')
  const month = (date.getUTCMonth() + 1).toString().padStart(2, '0')
  const year = date.getUTCFullYear().toString()

  const formattedDate = `${day}/${month}/${year}`
  return formattedDate
}

export const capitalizeFirstCharacter = (str: string): string => {
  if (str.length === 0) {
    return str
  }

  const firstChar = str.charAt(0).toUpperCase()
  const remainingChars = str.slice(1)

  return firstChar + remainingChars
}

export const generateHeaderDefault = (email: string, date: Date): string => {
  return `Daily Report - ${convertDate(date)} ${capitalizeFirstCharacter(
    shortenEmail(email)
  )}`
}

export const convertTasksToGroupTask = (tasks: Task[]) => {
  const groupTasks: GroupTasks = {
    todayPlans: [],
    actual: [],
    nextDayPlans: [],
    issue: []
  }
  if (!tasks) return groupTasks
  if (tasks && tasks.length === 0) return groupTasks
  tasks.forEach((task) => {
    switch (task.type) {
      case TYPE_TASK.TODAY_PLAN:
        groupTasks.todayPlans.push(TaskResp.plainToInstance(task))
        break
      case TYPE_TASK.ACTUAL:
        groupTasks.actual.push(TaskResp.plainToInstance(task))
        break
      case TYPE_TASK.NEXT_DAY_PLAN:
        groupTasks.nextDayPlans.push(TaskResp.plainToInstance(task))
        break
      case TYPE_TASK.ISSUE:
        groupTasks.issue.push(TaskResp.plainToInstance(task))
        break
      default:
        break
    }
  })

  return groupTasks
}

export const convertDailyReportToResp = (dailyReport: DailyReport) => {
  return {
    ...dailyReport,
    groupTask: convertTasksToGroupTask(dailyReport.tasks)
  }
}
