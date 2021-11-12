import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { Connection } from 'typeorm';
import { AccountsRepository } from './accounts.repository';
import { Account } from './entities/account.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AccountsService {
  constructor(
    private connection: Connection,
    private readonly accountsRepository: AccountsRepository,
  ) {}

  async create(createAccountDto: CreateAccountDto, user: any) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    console.log(user);
    try {
      // 유저 존재 여부 확인
      const existingUser = await queryRunner.manager
        .getRepository(User)
        .findOne(user.userId);
      if (!existingUser) {
        throw new UnauthorizedException('존재하지 않는 유저입니다');
      }
      // 계좌 존재 여부 확인
      const existingAccount = await queryRunner.manager
        .getRepository(Account)
        .findOne(createAccountDto.accountNum);
      if (existingAccount) {
        throw new UnauthorizedException('이미 존재하는 계좌번호입니다.');
      }
      const account = queryRunner.manager.getRepository(Account).create({
        ...createAccountDto,
        userId: user.userId,
      });
      const createdAccount = await queryRunner.manager
        .getRepository(Account)
        .save(account);
      await queryRunner.commitTransaction();
      return createdAccount;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async findAll() {
    return this.accountsRepository.find();
  }
}
