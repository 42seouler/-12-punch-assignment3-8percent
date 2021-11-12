import { OmitType, PickType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class ReadUserDto extends PickType(CreateUserDto, ['name'] as const) {}
