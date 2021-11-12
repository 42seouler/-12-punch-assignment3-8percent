import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { RecordType } from 'src/enums/record.type.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRecordDto {

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  account: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  recordAmount: number;

  // @IsNotEmpty()
  // @IsEnum(RecordType)
  // recordType: RecordType;

  @ApiProperty()
  @IsOptional()
  @IsString()
  note: string;
}
