// src/appointment-order/appointment-order.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentOrderController } from './order.controller';
import { AppointmentOrder } from './order.entity';
import { AppointmentOrderService } from './order.service';
@Module({
  imports: [TypeOrmModule.forFeature([AppointmentOrder])],
  controllers: [AppointmentOrderController],
  providers: [AppointmentOrderService],
})
export class AppointmentOrderModule {}
