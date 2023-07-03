import { Module } from '@nestjs/common';
import { Task } from './entities/task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([Task])],
    controllers: [],
    providers: [],
})
export class TaskModule {}
