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

  async create(createRecordDto: CreateRecordDto, user: any): Promise<Record> {
    //계좌인증
    const myAccount = await this.accountRepository.findOne({
      where: { accountNum: createRecordDto.account, userId: user.userId },
    });
    if (!myAccount) throw new UnauthorizedException('본인확인 실패');

    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      let { account, recordAmount, recordType } = createRecordDto;

      // 계좌 존재여부 조회
      let existingAccount = await queryRunner.manager
        .getRepository(Account)
        .findOne(account);

      if (!existingAccount) {
        throw new NotFoundException(`Account with ${account} not found`);
      } else {
        if (recordType == RecordType.deposit) {
          existingAccount.balance = existingAccount.balance + recordAmount;
        } else if (recordType == RecordType.withdraw) {
          //잔액 검사
          if (existingAccount.balance >= recordAmount) {
            existingAccount.balance = existingAccount.balance - recordAmount;
          } else {
            throw new PreconditionFailedException('insufficient balance');
          }
        }
        const savedAccount = await queryRunner.manager
          .getRepository(Account)
          .save(existingAccount);

        const record = queryRunner.manager.getRepository(Record).create({
          ...createRecordDto,
          balance: savedAccount.balance,
          note: createRecordDto.note ? createRecordDto.note : '',
          date: new Date(),
        });

        const createdRecord = await queryRunner.manager
          .getRepository(Record)
          .save(record);

        await queryRunner.commitTransaction();
        return createdRecord;
      }
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }

    // let { account, recordAmount, recordType, note } = createRecordDto;
    // note = note || '';

    // const record = await this.recordRepository.create({
    //   account,
    //   recordAmount,
    //   recordType,
    //   note,
    //   balance: myAccount.balance,
    // });

    // await this.recordRepository.save(record);
    // return record;
  }

  async findAll(findAllDto: FindAllDto, user: any) {
    let { limit, offset, account, from, to, year, month, type, order } =
      findAllDto;
    limit = limit || 2;
    offset = offset || 1;
    order = order || RecordOrder.recent;
    const yearAndMonth = `${year}-${month}`;

    const myAccount = await this.accountRepository.findOne({
      where: { accountNum: account, userId: user.userId },
    });
    if (!myAccount) throw new UnauthorizedException('본인확인 실패');

    const query = this.recordRepository
      .createQueryBuilder('record')
      .where({ account: account });

    if (from && to) {
      // query
      //   .andWhere(`Date(record.date) >= :Date(from)`)
      //   .andWhere(`Date(record.date) <= :Date(to)`);
      query.andWhere(
        `Date(record.date) >= Date(${from}) AND Date(record.date) <= Date(${to})`,
      );
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
