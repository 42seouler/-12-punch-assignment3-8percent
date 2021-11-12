import { Column, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAccountDto {
  @IsNumber()
  @ApiProperty()
  accountNum: number;

  @IsNumber()
  @ApiProperty()
  userId: number;
}
