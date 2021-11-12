import { PartialType } from '@nestjs/mapped-types';
import { CreateAccountDto } from './create-account.dto';
import { IsNumber, Min } from 'class-validator';

export class UpdateAccountDto extends PartialType(CreateAccountDto) {
  @IsNumber()
  @Min(0)
  balance: number;
}
