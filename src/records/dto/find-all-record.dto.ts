import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { RecordOrder } from '../../enums/record.order.enum';
import { RecordType } from '../../enums/record.type.enum';
import { ApiProperty,ApiPropertyOptional } from '@nestjs/swagger';

export class FindAllDto {
  
  @ApiPropertyOptional()
  @IsOptional()
  limit: number;

  
  @ApiPropertyOptional()
  @IsOptional()
  offset: number;

  
  @ApiProperty()
  @IsNotEmpty()
  // @IsNumber()
  account: number;

  
  @ApiPropertyOptional()
  @IsOptional()
  from: Date;

  
  @ApiPropertyOptional()
  @IsOptional()
  to: Date;

  
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  year: string;

  
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  month: string;

  
  @ApiPropertyOptional()
  @IsOptional()
  @IsEnum(RecordType)
  type: RecordType;

  
  @ApiPropertyOptional()
  @IsOptional()
  @IsEnum(RecordOrder)
  order: RecordOrder;
}
