import { BaseDto } from '@share/utils/base.dto'
import { Expose } from 'class-transformer'
import { GroupTasks } from '../interfaces/daily-report.interface'
import { IsNotEmpty, IsString } from 'class-validator'

export class DailyReportRespDto extends BaseDto {
  @Expose()
  heading: string

  @Expose()
  groupTask: GroupTasks
}
export class UpdateReportBodyDto {
  @IsString()
  @IsNotEmpty()
  heading: string
}
