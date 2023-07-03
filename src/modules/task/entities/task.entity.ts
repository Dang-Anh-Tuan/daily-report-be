import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  DeleteDateColumn
} from 'typeorm'
import { TYPE_TASK } from '../interfaces/task.interface'

@Entity({ name: 'task' })
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', nullable: false, unique: true })
  content!: string

  @Column({ type: 'int', nullable: false, default: 0 })
  percent: number

  @Column({ type: 'enum', enum: TYPE_TASK, default: TYPE_TASK.TODAY_PLAN })
  type: number

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date // Creation date

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date // Last updated date

  @DeleteDateColumn()
  deletedAt?: Date
}
