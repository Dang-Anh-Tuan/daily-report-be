import { DailyReport } from '@modules/daily-report/entities/daily-report.entity'
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany
} from 'typeorm'

@Entity({ name: 'user' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', nullable: false, unique: true })
  email!: string

  @Column({ type: 'varchar', nullable: true })
  avatar: string

  @Column({ type: 'varchar', nullable: true })
  employeeId: string

  @Column({ type: 'varchar', nullable: true })
  department: string

  @Column({ type: 'varchar', nullable: true })
  refreshToken: string

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date

  @DeleteDateColumn()
  deletedAt?: Date

  @OneToMany(() => DailyReport, (report) => report.user)
  dailyReports: DailyReport[]
}
