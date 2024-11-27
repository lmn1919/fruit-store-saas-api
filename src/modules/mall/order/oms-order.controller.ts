import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
  Request
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { OrderSearchDto } from './dto/order-search.dto';
import { ReceiverInfo } from './dto/receiverInfo.dto';
import { OmsOrderService } from './oms-order.service';

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

  @ApiOperation({ summary: '修改收货人信息' })
  @Post('/update/receiverInfo')
  // @Transaction()
  updateRei(
    @Body() info: ReceiverInfo,
    @Request() req,

  ) {
    // return this.omsOrderService.receiverInfo(info, manager, req.user.nickName);
  }

  @ApiOperation({ summary: '批量发货' })
  @Post('/update/delivery')
  updateDelivery(@Body() orders: [any], @Request() req) {
    console.log('批量参数', orders, req);
    if (!orders.length) {
      throw new HttpException('订单不能为空', HttpStatus.BAD_REQUEST);
    }
    return this.omsOrderService.batchUpdateDelivery(orders);
  }

  @ApiOperation({ summary: '批量删除订单' })
  @Post('/delete')
  updateDelete(@Query('ids') ids: string) {
    return this.omsOrderService.batchUpdateDeleteStatus(ids);
  }
}
