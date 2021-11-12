import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { RecordType } from '../../enums/record.type.enum';

export class CreateRecordDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  account: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  recordAmount: number;

  @IsNotEmpty()
  @IsEnum(RecordType)
  recordType: RecordType;

  @IsOptional()
  @IsString()
  note: string;
}
