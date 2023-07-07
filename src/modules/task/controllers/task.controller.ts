/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Post, Put } from '@nestjs/common'
import { TaskService } from '../services/task.service'
import { TaskCreate, TaskCreateUpdate } from '../interfaces/task.interface'
import { TaskCreateSingle } from '../dtos/task.dto'

@Controller('/task')
export class TaskController {
  constructor(private taskService: TaskService) {}
  @Post()
  createTask(@Body() body: TaskCreateSingle) {
    this.taskService.createTaskSingle(body)
  }

  @Put()
  updateTask(@Body() body: TaskCreateUpdate) {
    this.taskService.updateTask(body)
  }
}
