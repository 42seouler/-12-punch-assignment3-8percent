import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { RecordOrder } from '../../enums/record.order.enum';
import { RecordType } from '../../enums/record.type.enum';
import { ApiQuery } from '@nestjs/swagger';

export class FindAllDto {
  @IsOptional()
  limit: number;

  @IsOptional()
  offset: number;

  @IsNotEmpty()
  // @IsNumber()
  account: number;

  @IsOptional()
  from: Date;

  @IsOptional()
  to: Date;

  @IsOptional()
  @IsString()
  year: string;

  @IsOptional()
  @IsString()
  month: string;

  @IsOptional()
  @IsEnum(RecordType)
  type: RecordType;

  @IsOptional()
  @IsEnum(RecordOrder)
  order: RecordOrder;
}
