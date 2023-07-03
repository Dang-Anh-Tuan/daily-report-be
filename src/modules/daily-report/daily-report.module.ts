import { Module } from '@nestjs/common';
import { DailyReport } from './entities/daily-report.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([DailyReport])],
    controllers: [],
    providers: [],
})
export class DailyReportModule {}
