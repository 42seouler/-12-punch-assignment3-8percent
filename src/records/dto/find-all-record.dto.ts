import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { RecordOrder } from 'src/enums/record.order.enum';
import { RecordType } from 'src/enums/record.type.enum';

export class FindAllDto {
  @IsOptional()
  @IsNumber()
  limit?: number;

  @IsOptional()
  @IsNumber()
  offset?: number;

  @IsNotEmpty()
  // @IsNumber()
  account: number;

  @IsOptional()
  from?: Date;

  @IsOptional()
  to?: Date;

  @IsOptional()
  @IsString()
  year?: string;

  @IsOptional()
  @IsString()
  month?: string;

  @IsOptional()
  @IsEnum(RecordType)
  type?: RecordType;

  @IsOptional()
  @IsEnum(RecordOrder)
  order?: RecordOrder;
}
