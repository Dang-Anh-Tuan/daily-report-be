/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common'
import { DailyReportService } from '../services/daily-report.service'
import {
  DailyReportRespDto,
  UpdateReportBodyDto
} from '../dtos/daily-report.dto'
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard'

@Controller('/daily-report')
export class DailyReportController {
  constructor(private dailyReportService: DailyReportService) {}
  @UseGuards(JwtAuthGuard)
  @Get('/current/:id')
  async getCurrentReport(@Param('id') idUser: number) {
    return DailyReportRespDto.plainToInstance(
      await this.dailyReportService.getCurrentDailyReport(idUser)
    )
  }

  @UseGuards(JwtAuthGuard)
  @Put('/update/:id')
  async updateDailyReport(
    @Param('id') idReport: number,
    @Body('data') data: UpdateReportBodyDto
  ) {
    return await this.dailyReportService.updateReport({
      id: idReport,
      heading: data.heading
    })
  }
}
