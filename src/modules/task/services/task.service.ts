/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common'
import { TaskRepo } from '../repositories/task.repository'
import { TaskCreate } from '../interfaces/task.interface'

@Injectable()
export class TaskService {
  constructor(private taskRepo: TaskRepo) {}

  async createTask(task: TaskCreate[]) {
    return await this.taskRepo.createMany(task)
  }
}
