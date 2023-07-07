/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Post } from '@nestjs/common'
import { TaskService } from '../services/task.service'

@Controller('/task')
export class TaskController {
  constructor(private taskService: TaskService) {}
  @Post('/create')
  createTask(@Body() body) {
    this.taskService.createTask(body)
  }
}
