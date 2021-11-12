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

@Controller('records')
export class RecordsController {
  constructor(private readonly recordsService: RecordsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('deposit')
  createDeposit(@Body() createRecordDto: CreateRecordDto, @Request() req) {
    return this.recordsService.createDeposit(createRecordDto, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('withdraw')
  createWithdraw(@Body() createRecordDto: CreateRecordDto, @Request() req) {
    return this.recordsService.createWithdraw(createRecordDto, req.user);
  }
  @Get()
  findAll(@Query() findAllDto: FindAllDto) {
    return this.recordsService.findAll(findAllDto);

  }
}
