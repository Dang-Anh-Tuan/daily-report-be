import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { TYPE_TASK } from '../interfaces/task.interface'
import { DailyReport } from './../../daily-report/entities/daily-report.entity'

@Entity({ name: 'task' })
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', nullable: false })
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

  @ManyToOne(() => DailyReport, (dailyReport) => dailyReport.tasks)
  dailyReport: DailyReport
}
