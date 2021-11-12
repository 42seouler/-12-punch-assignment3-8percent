import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { AccountsRepository } from './accounts.repository';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Account, AccountsRepository]),
    UsersModule,
  ],
  controllers: [AccountsController],
  providers: [AccountsService],
})
export class AccountsModule {}
