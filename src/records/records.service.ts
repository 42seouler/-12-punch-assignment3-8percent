import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  PreconditionFailedException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from 'src/accounts/entities/account.entity';
import { RecordOrder } from 'src/enums/record.order.enum';
import { RecordType } from 'src/enums/record.type.enum';
import { User } from 'src/users/entities/user.entity';
import { Repository, Connection } from 'typeorm';
import { CreateRecordDto } from './dto/create-record.dto';
import { FindAllDto } from './dto/find-all-record.dto';
import { Record } from './entities/record.entity';

@Injectable()
export class RecordsService {
  constructor(
    @InjectRepository(Record)
    private readonly recordRepository: Repository<Record>,
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    private connection: Connection,
  ) {}

  async createDeposit(
    createRecordDto: CreateRecordDto,
    user: any,
  ): Promise<Record> {
    let { account, recordAmount, note } = createRecordDto;
    note = note || '';

    //계좌인증
    let myAccount = await this.accountRepository.findOne({
      where: { accountNum: account, userId: user.userId },
    });

    if (!myAccount) throw new UnauthorizedException('본인확인 실패');

    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      myAccount.balance = myAccount.balance + recordAmount;

      const savedAccount = await queryRunner.manager
        .getRepository(Account)
        .save(myAccount);

      const record = queryRunner.manager.getRepository(Record).create({
        ...createRecordDto,
        balance: savedAccount.balance,
        note: note,
        recordType: RecordType.deposit,
        date: new Date(),
      });

      const createdRecord = await queryRunner.manager
        .getRepository(Record)
        .save(record);

      await queryRunner.commitTransaction();
      return createdRecord;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async createWithdraw(
    createRecordDto: CreateRecordDto,
    user: any,
  ): Promise<Record> {
    let { account, recordAmount, note } = createRecordDto;
    note = note || '';

    //계좌인증
    let myAccount = await this.accountRepository.findOne({
      where: { accountNum: account, userId: user.userId },
    });
    if (!myAccount) throw new UnauthorizedException('본인확인 실패');

    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      //잔액 검사
      if (myAccount.balance >= recordAmount) {
        myAccount.balance = myAccount.balance - recordAmount;
      } else {
        throw new PreconditionFailedException('insufficient balance');
      }

      const savedAccount = await queryRunner.manager
        .getRepository(Account)
        .save(myAccount);

      const record = queryRunner.manager.getRepository(Record).create({
        ...createRecordDto,
        balance: savedAccount.balance,
        note: note,
        recordType: RecordType.withdraw,
        date: new Date(),
      });

      const createdRecord = await queryRunner.manager
        .getRepository(Record)
        .save(record);

      await queryRunner.commitTransaction();
      return createdRecord;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async findAll(findAllDto: FindAllDto, user: any) {
    let { limit, offset, account, from, to, year, month, type, order } =
      findAllDto;

    const query = this.recordRepository
      .createQueryBuilder('record')
      .where({ account: account });

    limit = limit || 2;
    offset = offset || 1;
    order = order || RecordOrder.recent;
    const yearAndMonth = `${year}-${month}`;

    const myAccount = await this.accountRepository.findOne({
      where: { accountNum: account, userId: user.userId },
    });

    if (!myAccount) throw new UnauthorizedException('본인확인 실패');
    console.log(user);

    if (from && to) {
      query.where('Date(date) >= :from', { from: from });
      query.andWhere('Date(date) <= :to', { to: to });
    }

    if (year && month) {
      query.andWhere(`record.date LIKE :yearAndMonth`, {
        yearAndMonth: `${yearAndMonth}%`,
      });
    }

    if (type) {
      query.andWhere(`record.recordType = :type`, { type });
    }

    if (order === RecordOrder.recent) {
      query.orderBy('record.date', 'DESC');
    } else {
      query.orderBy('record.date', 'ASC');
    }

    query.take(limit).skip(limit * (offset - 1));

    try {
      const records = await query.getMany();
      return records;
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }
}
