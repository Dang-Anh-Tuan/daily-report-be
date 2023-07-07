import { TaskResp } from '../../task/dtos/task.dto'

export interface GroupTasks {
  todayPlans: TaskResp[]
  actual: TaskResp[]
  nextDayPlans: TaskResp[]
  issue: TaskResp[]
}

export interface RequestReportUpdate {
  id: number
  heading: string
}
