import { Injectable, NotFoundException, PreconditionFailedException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from '../accounts/entities/account.entity';
import { RecordOrder } from '../enums/record.order.enum';
import { RecordType } from '../enums/record.type.enum';
import { Repository,Connection } from 'typeorm';
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
    private connection: Connection
  ) {}

  async createDeposit(createRecordDto: CreateRecordDto, user: any): Promise<Record> {
    
    let { account, recordAmount, note } = createRecordDto;
    note = note || '';

    //계좌인증
    let myAccount = await this.accountRepository.findOne({
      where: { accountNum: account, userId: user.userId },
    });
    if(!myAccount) throw new UnauthorizedException('본인확인 실패');

    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {      
        
      myAccount.balance = myAccount.balance+recordAmount;   
      
      const savedAccount = await queryRunner.manager
      .getRepository(Account)
      .save(myAccount);

      const record = queryRunner.manager.getRepository(Record).create({
        ...createRecordDto,
        balance : savedAccount.balance,
        note : note,
        recordType : RecordType.deposit,
        date: new Date()
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

  
  async createWithdraw(createRecordDto: CreateRecordDto, user: any): Promise<Record> {
    
    let { account, recordAmount, note } = createRecordDto;
    note = note || '';

    //계좌인증
    let myAccount = await this.accountRepository.findOne({
      where: { accountNum: account, userId: user.userId },
    });
    if(!myAccount) throw new UnauthorizedException('본인확인 실패');

    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {

        //잔액 검사     
        if(myAccount.balance >= recordAmount){ 
          myAccount.balance = myAccount.balance-recordAmount; 
        }else{ 
          throw new PreconditionFailedException('insufficient balance');
        }    
        
        const savedAccount = await queryRunner.manager
        .getRepository(Account)
        .save(myAccount);

        const record = queryRunner.manager.getRepository(Record).create({
          ...createRecordDto,
          balance : savedAccount.balance,
          note : note,
          recordType : RecordType.withdraw,
          date: new Date()
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
