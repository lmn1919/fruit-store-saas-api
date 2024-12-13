import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Request
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { OrderSearchDto } from './dto/order-search.dto';
import { OrderEntity } from './entities/order.entity';
import { OmsOrderService } from './order.service';
@ApiTags('订单管理')
@Controller('order')
export class OmsOrderController {
  constructor(private readonly omsOrderService: OmsOrderService) {}

  @ApiOperation({ summary: '查询订单列表' })
  @Get('list')
  async findAll(@Query() search: OrderSearchDto) {
    const pageList = await this.omsOrderService.getPageList(search);

  }

  @ApiOperation({ summary: '查询订单详情' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.omsOrderService.findOne(id);
  }

  @ApiOperation({ summary: '备注订单' })
  @Post('/update/note')
  // @Transaction()
  updateNote(
    @Query('id') id: string,
    @Query('note') note: string,
    @Query('status') status: number,
    @Request() req,
  ) {
    // return this.omsOrderService.updateNote(
    //   id,
    //   note,
    //   status,
    //   manager,
    //   req.user.nickName,
    // );
  }


  @ApiOperation({ summary: '批量删除订单' })
  @Post('/delete')
  updateDelete(@Query('ids') ids: string) {
    return this.omsOrderService.batchUpdateDeleteStatus(ids);
  }

  @ApiOperation({ summary: '创建订单' })
  @Post('/create')
  createOrder(@Body() dto: OrderEntity) {
    return this.omsOrderService.createOrder(dto);
  }
}
