import { BaseDto } from '@share/utils/base.dto'
import { Expose } from 'class-transformer'
import { TYPE_TASK } from '../interfaces/task.interface'
import { IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator'

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



export class TaskCreateSingle {
  @IsInt()
  @IsNotEmpty()
  idReport: number
  
  @IsString()
  @IsNotEmpty()
  content: string
  
  @IsInt()
  @IsNotEmpty()
  @Min(0)
  @Max(100)
  percent: number
  
  @IsInt()
  @Min(1)
  @Max(4)
  type: TYPE_TASK
}
