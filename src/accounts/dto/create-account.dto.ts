import { Column, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { IsNumber, Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAccountDto {
  @IsNumber()
  @Min(100000000000)
  @Max(999999999999)
  @ApiProperty()
  accountNum: number;
}
