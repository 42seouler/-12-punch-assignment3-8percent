import { Account } from 'src/accounts/entities/account.entity';
import { PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm'

export class Record {

    @PrimaryGeneratedColumn()
    @ManyToOne(() => Account, (account) => account.accountNum)
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
