import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from 'src/accounts/entities/account.entity';
import { RecordOrder } from 'src/enums/record.order.enum';
import { RecordType } from 'src/enums/record.type.enum';
import { Repository } from 'typeorm';
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
  ) {}

  async create(createRecordDto: CreateRecordDto): Promise<Record> {
    let { account, recordAmount, recordType, note } = createRecordDto;
    note = note || '';

    const myAccount = await this.accountRepository.findOne({
      where: { accountNum: account },
    });

    const record = await this.recordRepository.create({
      account,
      recordAmount,
      recordType,
      note,
      balance: myAccount.balance,
    });

    await this.recordRepository.save(record);
    return record;
  }

  // 소유주 인증 필요
  async findAll(findAllDto: FindAllDto): Promise<Record[]> {
    // 계좌번호 선택
    // 거래일시
    //  조회기간
    //    - 전일, 당일, 3일, 1주일, 1개월, 3개월
    //    - 연/월/일 ~ 연/월/일
    //  월별조회
    //    - 년/월
    // 조회내용
    //  - 입금내용만/출금내용만
    // 조회결과순서
    //  - 최근내역순서/과거내역순서
    let { limit, offset, account, from, to, year, month, type, order } =
      findAllDto;
    limit = limit || 10;
    offset = offset || 1;
    type = type || RecordType.all;
    order = order || RecordOrder.recent;
    const yearAndMonth = `${year}-${month}`;
    const query = this.recordRepository.createQueryBuilder('record');

    query.where({ account: account });

    if (from && to) {
      query.andWhere(`BETWEEN record.date = :from AND record.date = :to`, {
        from,
        to,
      });
    }

    if (yearAndMonth) {
      query.andWhere(`record.date LIKE :yearAndMonth`, {
        yearAndMonth: `${yearAndMonth}%`,
      });
    }

    if (type) {
      query.andWhere(`record.recordType = :type`, { type });
    }

    query.take(limit).skip(limit * offset - 1);

    if (order === RecordOrder.recent) {
      query.orderBy('record.date', 'DESC');
    } else {
      query.orderBy('record.date', 'ASC');
    }

    try {
      const records = await query.getMany();
      return records;
    } catch (err) {}

  }
}
