import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import BaseRepo from '@share/utils/base.repo'
import { Repository } from 'typeorm'
import { Task } from '../entities/task.entity'

@Injectable()
export class TaskRepo extends BaseRepo<Task> {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>
  ) {
    super(taskRepository)
  }
}
