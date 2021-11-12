import { Module } from '@nestjs/common';
import { RecordsService } from './records.service';
import { RecordsController } from './records.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Record } from './entities/record.entity';
import { Account } from '../accounts/entities/account.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Record, Account]),
  ],
  exports: [TypeOrmModule],
  controllers: [RecordsController],
  providers: [RecordsService],
})
export class RecordsModule {}
