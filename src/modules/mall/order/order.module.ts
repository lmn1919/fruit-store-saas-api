import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItemEntity } from './entities/order-item.entity';
import { OrderOperateHistory } from './entities/order-operate-history.entity';
import { OrderEntity } from './entities/order.entity';
import { OmsOrderController } from './order.controller';
import { OmsOrderService } from './order.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderEntity, OrderOperateHistory, OrderItemEntity]),
  ],
  controllers: [OmsOrderController],
  providers: [OmsOrderService],
})
export class OmsOrderModule {}
