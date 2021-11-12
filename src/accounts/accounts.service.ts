import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Connection } from 'typeorm';
import { AccountsRepository } from './accounts.repository';
import { Account } from './entities/account.entity';

@Injectable()
export class AccountsService {
  constructor(
    private connection: Connection,
    private readonly accountsRepository: AccountsRepository,
  ) {}

  async create(createAccountDto: CreateAccountDto) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      // 계좌 존재 여부 확인
      const existingAccount = await queryRunner.manager
        .getRepository(Account)
        .findOne(createAccountDto.accountNum);
      if (existingAccount) {
        throw new UnauthorizedException('이미 존재하는 계좌번호입니다.');
      }
      const account = queryRunner.manager.getRepository(Account).create({
        ...createAccountDto,
        balance: 1,
      });
      const createdAccount = await queryRunner.manager
        .getRepository(Account)
        .save(account);
      await queryRunner.commitTransaction();
      return createdAccount.accountNum;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  findAll() {
    return `This action returns all accounts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} account`;
  }

  update(id: number, updateAccountDto: UpdateAccountDto) {
    return `This action updates a #${id} account`;
  }

  remove(id: number) {
    return `This action removes a #${id} account`;
  }
}
