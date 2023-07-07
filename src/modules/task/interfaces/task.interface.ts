import { DailyReport } from '@modules/daily-report/entities/daily-report.entity'

export enum TYPE_TASK {
  TODAY_PLAN = 1,
  ACTUAL = 2,
  NEXT_DAY_PLAN = 3,
  ISSUE = 4
}

export interface TaskCreate {
  content: string
  percent: number
  type: TYPE_TASK
  dailyReport: DailyReport
}
