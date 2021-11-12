import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Record {
  @PrimaryColumn({ type: 'unsigned big int' })
  // @ManyToOne()
  account: number;

  @PrimaryColumn()
  date: Date;

  @Column({ type: 'unsigned big int' })
  recordAmount: number;

  @Column()
  recordType: string;

  @Column({ type: 'unsigned big int' })
  balance: number;

  @Column('varchar', { length: 7 })
  note: string;
}
