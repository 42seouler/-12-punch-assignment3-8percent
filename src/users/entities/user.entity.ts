import { Column, Entity } from 'typeorm';
import { BaseCommonEntity } from '../../common/base-common.entity';

@Entity()
export class User extends BaseCommonEntity {
  @Column()
  name: string;

  @Column()
  password: string;
}
