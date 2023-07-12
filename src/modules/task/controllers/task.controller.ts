/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Body,
  Controller,
  Delete,
  Post,
  Put,
  Param,
  UseGuards
} from '@nestjs/common'
import { TaskCreateSingle } from '../dtos/task.dto'
import { TaskCreateUpdate } from '../interfaces/task.interface'
import { TaskService } from '../services/task.service'
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard'

@Controller('/task')
export class TaskController {
  constructor(private taskService: TaskService) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  createTask(@Body() body: TaskCreateSingle) {
    this.taskService.createTaskSingle(body)
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  updateTask(@Body() body: TaskCreateUpdate) {
    this.taskService.updateTask(body)
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteTask(@Param('id') idTask: number) {
    return await this.taskService.deleteTask(idTask)
  }
}
