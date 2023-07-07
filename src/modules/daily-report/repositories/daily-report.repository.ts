import BaseRepo from '@share/utils/base.repo'
import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { DailyReport } from '../entities/daily-report.entity'

@Injectable()
export class DailyReportRepo extends BaseRepo<DailyReport> {
  constructor(
    @InjectRepository(DailyReport)
    private readonly dailyReportRepository: Repository<DailyReport>
  ) {
    super(dailyReportRepository)
  }

  async getNearestDailyReportByUserId(
    userId: number
  ): Promise<DailyReport | null> {
    const nearestDailyReport = await this.dailyReportRepository
      .createQueryBuilder('daily_report')
      .leftJoinAndSelect('daily_report.tasks', 'task')
      .where('daily_report.user_id = :userId', { userId })
      .orderBy('daily_report.created_at', 'DESC')
      .getOne()

    return nearestDailyReport || null
  }
}
