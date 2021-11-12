import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Account {
  @PrimaryColumn()
  account: number;

  @Column({
    default: 0,
  })
  balance: number;

  @ManyToOne(() => User, (user) => user.id)
  userId: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;
}
