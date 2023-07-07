import { BaseDto } from '@share/utils/base.dto'
import { Expose } from 'class-transformer'
import { TYPE_TASK } from '../interfaces/task.interface'

export class TaskResp extends BaseDto {
  @Expose()
  id: number
  
  @Expose()
  content: string
  
  @Expose()
  percent?: number
  
  @Expose()
  type?: TYPE_TASK
}

