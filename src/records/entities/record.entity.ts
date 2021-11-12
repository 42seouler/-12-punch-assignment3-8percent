import { Account } from 'src/accounts/entities/account.entity';
import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  Entity,
} from 'typeorm';

@Entity()
export class Record {
  @PrimaryGeneratedColumn()
  id: number;

  // @ManyToOne(() => Account, (account) => account.accountNum)
  @Column()
  account: number;

  @CreateDateColumn()
  date: Date;

  @Column()
  recordAmount: number;

  @Column()
  recordType: string;

  @Column()
  balance: number;

  @Column()
  note: string;
}
