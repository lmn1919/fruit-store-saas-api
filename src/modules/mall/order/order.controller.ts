// src/appointment-order/appointment-order.controller.ts
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateAppointmentOrderDto } from './dto/create-appointment-order.dto';
import { UpdateAppointmentOrderDto } from './dto/update-appointment-order.dto';
import { AppointmentOrder } from './order.entity';
import { AppointmentOrderService } from './order.service';

@ApiTags('appointment-order 预约单管理')
@Controller('appointment-order')
export class AppointmentOrderController {
  constructor(private readonly appointmentOrderService: AppointmentOrderService) {}

  @Post()
  @ApiOperation({ summary: '创建新的预约订单' })
  @ApiResponse({ status: 201, description: '成功创建预约订单。', type: AppointmentOrder })
  async create(@Body() createAppointmentOrderDto: CreateAppointmentOrderDto): Promise<AppointmentOrder> {
    return this.appointmentOrderService.create(createAppointmentOrderDto);
  }

  @Get()
  @ApiOperation({ summary: '获取所有预约订单' })
  @ApiResponse({ status: 200, description: '返回所有预约订单。', type: [AppointmentOrder] })
  async findAll(): Promise<AppointmentOrder[]> {
    return this.appointmentOrderService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: '通过ID获取预约订单' })
  @ApiResponse({ status: 200, description: '返回指定ID的预约订单。', type: AppointmentOrder })
  @ApiParam({ name: 'id', description: '预约订单ID' })
  async findOne(@Param('id') id: number): Promise<AppointmentOrder> {
    return this.appointmentOrderService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: '更新预约订单' })
  @ApiResponse({ status: 200, description: '成功更新预约订单。', type: AppointmentOrder })
  @ApiParam({ name: 'id', description: '预约订单ID' })
  async update(@Param('id') id: number, @Body() updateAppointmentOrderDto: UpdateAppointmentOrderDto): Promise<AppointmentOrder> {
    return this.appointmentOrderService.update(id, updateAppointmentOrderDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除预约订单' })
  @ApiResponse({ status: 200, description: '成功删除预约订单。' })
  @ApiParam({ name: 'id', description: '预约订单ID' })
  async remove(@Param('id') id: number): Promise<void> {
    return this.appointmentOrderService.remove(id);
  }
}
