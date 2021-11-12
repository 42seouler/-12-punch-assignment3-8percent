import { IsNumber, IsString, Min } from 'class-validator';

export class CreateRecordDto {
  @IsNumber()
  @Min(0)
  account: number;

  @IsNumber()
  @Min(0)
  recordAmount: number;

  @IsString()
  recordType: string;

  @IsString()
  note: string;
}
