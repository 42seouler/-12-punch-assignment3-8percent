import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Account {
  @PrimaryColumn({ type: 'unsigned big int' })
  account: number;

  @Column({ type: 'unsigned big int' })
  balance: number;

  /*  @ManyToOne(() => User, (user) => user.id)
  userId: number;*/

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;
}
