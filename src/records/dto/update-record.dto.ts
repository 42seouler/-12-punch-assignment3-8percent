import { PartialType } from '@nestjs/swagger';
import { CreateRecordDto } from './create-record.dto';

// 거래내역은 수정, 삭제 없이 모든 내역이 저장되어야 하므로 UpdateRecordDto 는 사용 안 함.
export class UpdateRecordDto extends PartialType(CreateRecordDto) {}
