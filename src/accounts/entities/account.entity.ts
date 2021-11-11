import { User } from 'src/users/entities/user.entity';
import { Column, CreateDateColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export class Account {

    @PrimaryGeneratedColumn()
    accountNum: number;

    @Column()
    balance: number;

    @ManyToOne(() => User, (user) => user.id)
    userId: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
  
    @UpdateDateColumn({ name: 'updated_at' })
    updated_at: Date;
}
