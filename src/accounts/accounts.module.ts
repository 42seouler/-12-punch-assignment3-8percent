import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { Record } from '../records/entities/record.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Account]),
    // TypeOrmModule.forFeature([Record]),
  ],
  exports: [TypeOrmModule],
  controllers: [AccountsController],
  providers: [AccountsService],
})
export class AccountsModule {}
