import {
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { RecordsService } from './records.service';
import { CreateRecordDto } from './dto/create-record.dto';
import { UpdateRecordDto } from './dto/update-record.dto';
import { FindAllDto } from './dto/find-all-record.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('records')
@Controller('records')
export class RecordsController {
  constructor(private readonly recordsService: RecordsService) {}

  @ApiOperation({ summary: '입금' })
  @UseGuards(JwtAuthGuard)
  @Post('deposit')
  createDeposit(@Body() createRecordDto: CreateRecordDto, @Request() req) {
    return this.recordsService.createDeposit(createRecordDto, req.user);
  }

  @ApiOperation({ summary: '출금' })
  @UseGuards(JwtAuthGuard)
  @Post('withdraw')
  createWithdraw(@Body() createRecordDto: CreateRecordDto, @Request() req) {
    return this.recordsService.createWithdraw(createRecordDto, req.user);
  }

  @ApiOperation({ summary: '거래내역 조회' })
  @Get()
  findAll(@Query() findAllDto: FindAllDto) {
    return this.recordsService.findAll(findAllDto);

  }
}
