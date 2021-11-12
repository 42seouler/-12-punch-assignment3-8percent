import {
  Injectable,
  InternalServerErrorException,
  PreconditionFailedException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { Account } from 'src/accounts/entities/account.entity';
import { RecordOrder } from 'src/enums/record.order.enum';
import { RecordType } from 'src/enums/record.type.enum';
import { Repository, Connection } from 'typeorm';
import { CreateRecordDto } from './dto/create-record.dto';
import { FindAllDto } from './dto/find-all-record.dto';
import { Record } from './entities/record.entity';
import {
  TRANSACTION_EVEN_DB_CONNECTION,
  TRANSACTION_ODD_DB_CONNECTION,
} from '../distributedData';

@Injectable()
export class RecordsService {
  constructor(
    @InjectRepository(Record)
    private readonly recordRepository: Repository<Record>,
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    private connection: Connection,
    @InjectConnection(TRANSACTION_ODD_DB_CONNECTION)
    private connectionODD: Connection,
    @InjectConnection(TRANSACTION_EVEN_DB_CONNECTION)
    private connectionEVEN: Connection,
  ) {}

  async createDeposit(
    createRecordDto: CreateRecordDto,
    user: any,
  ): Promise<Record> {
    let { account, recordAmount, note } = createRecordDto;
    note = note || '';

    //계좌인증
    const myAccount = await this.accountRepository.findOne({
      where: { accountNum: account, userId: user.userId },
    });

    if (!myAccount) throw new UnauthorizedException('본인확인 실패');
    // 마스터 DB 트랜잭션
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      myAccount.balance = myAccount.balance + recordAmount;
      await queryRunner.manager.getRepository(Account).save(myAccount);
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();

      // 분산 저장을 위한 모듈러 연산
      let connection;
      if (user.userId % 2) {
        connection = this.connectionODD;
      } else {
        connection = this.connectionEVEN;
      }

      // 슬레이브 트랜잭션
      const slaveQueryRunner = connection.createQueryRunner();
      await slaveQueryRunner.connect();
      await slaveQueryRunner.startTransaction();
      try {
        const record = slaveQueryRunner.manager.getRepository(Record).create({
          ...createRecordDto,
          balance: myAccount.balance,
          note: note,
          recordType: RecordType.deposit,
          date: new Date(),
        });

        const createdRecord = await slaveQueryRunner.manager
          .getRepository(Record)
          .save(record);

        await slaveQueryRunner.commitTransaction();
        return createdRecord;
      } catch (err) {
        await slaveQueryRunner.rollbackTransaction();
        throw err;
      } finally {
        await slaveQueryRunner.release();
      }
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
    //잔액 검사
    if (myAccount.balance >= recordAmount) {
      myAccount.balance = myAccount.balance - recordAmount;
    } else {
      throw new PreconditionFailedException('insufficient balance');
    }
    // 마스터 DB 트랜잭션
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.getRepository(Account).save(myAccount);
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }

    // 분산 저장을 위한 모듈러 연산
    let connection;
    if (user.userId % 2) {
      connection = this.connectionODD;
    } else {
      connection = this.connectionEVEN;
    }

    // 슬레이브 DB 트랜잭션
    const slaveQueryRunner = connection.createQueryRunner();
    await slaveQueryRunner.connect();
    await slaveQueryRunner.startTransaction();
    try {
      const record = slaveQueryRunner.manager.getRepository(Record).create({
        ...createRecordDto,
        balance: myAccount.balance,
        note: note,
        recordType: RecordType.withdraw,
        date: new Date(),
      });

      const createdRecord = await slaveQueryRunner.manager
        .getRepository(Record)
        .save(record);
      await slaveQueryRunner.commitTransaction();
      return createdRecord;
    } catch (err) {
      await slaveQueryRunner.rollbackTransaction();
      throw err;
    } finally {
      await slaveQueryRunner.release();
    }
  }

  async findAll(findAllDto: FindAllDto, user: any) {
    let { limit, offset, account, from, to, year, month, type, order } =
      findAllDto;

    // 분산 DB에서 찾기위한 모듈러 연산k
    let connection;
    if (user.userId % 2) {
      connection = this.connectionODD;
    } else {
      connection = this.connectionEVEN;
    }

    const query = connection
      .createQueryBuilder(Record, 'record')
      .where({ account: account });

    limit = limit || 10;
    offset = offset || 1;
    order = order || RecordOrder.recent;
    const yearAndMonth = `${year}-${month}`;

    const myAccount = await this.accountRepository.findOne({
      where: { accountNum: account, userId: user.userId },
    });
    if (!myAccount) throw new UnauthorizedException('본인확인 실패');

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
