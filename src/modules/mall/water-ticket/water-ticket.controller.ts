import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateWaterTicketDto } from './dto/create-water-ticket.dto';
import { WaterTicketService } from './water-ticket.service';

@ApiTags('电子水票')
@Controller('water-ticket')
export class WaterTicketController {
  constructor(private readonly waterTicketService: WaterTicketService) {}

  @Post()
  @ApiOperation({ summary: '创建水票' })
  create(@Body() createWaterTicketDto: CreateWaterTicketDto) {
    return this.waterTicketService.create(createWaterTicketDto);
  }

  @Get()
  @ApiOperation({ summary: '获取所有水票' })
  findAll() {
    return this.waterTicketService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: '根据ID获取水票' })
  findOne(@Param('id') id: string) {
    return this.waterTicketService.findOne(+id);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: '获取用户的水票列表' })
  findByUserId(@Param('userId') userId: string) {
    return this.waterTicketService.findByUserId(+userId);
  }
} 