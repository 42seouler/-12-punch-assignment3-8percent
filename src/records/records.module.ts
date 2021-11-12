import { Module } from '@nestjs/common';
import { RecordsService } from './records.service';
import { RecordsController } from './records.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Record } from './entities/record.entity';
import { Account } from '../accounts/entities/account.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Record, Account]),
    TypeOrmModule.forFeature([Record, Account], 'odd'),
    TypeOrmModule.forFeature([Record, Account], 'even'),
  ],
  exports: [TypeOrmModule],
  controllers: [RecordsController],
  providers: [RecordsService],
})
export class RecordsModule {}
