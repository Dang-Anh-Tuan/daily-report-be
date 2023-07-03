import { User } from '@modules/user/entities/user.entity'
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne
} from 'typeorm'

@Entity({ name: 'daily_report' })
export class DailyReport extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', nullable: true })
  heading: string

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date

  @DeleteDateColumn()
  deletedAt?: Date

  @ManyToOne(() => User, (user) => user.dailyReports)
  user: User
}
