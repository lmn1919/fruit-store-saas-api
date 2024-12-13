import { ApiProperty, IntersectionType, PartialType } from '@nestjs/swagger';
import { IsArray, IsDate, IsDecimal, IsNotEmpty, IsNumber, IsOptional, IsString, Length, Max, Min } from 'class-validator';
import { PagerDto } from '~/common/dto/pager.dto';
import { PayEntity } from '../../pay/pay.entity';
import { OrderItem } from '../entities/order-item.entity';
import { OrderOperateHistory } from '../entities/order-operate-history.entity';
export class OrderDto {
  @ApiProperty({ description: '会员ID' })
  @IsOptional()
  @IsString()
  memberId: string;

  @ApiProperty({ description: '优惠券ID' })
  @IsOptional()
  @IsString()
  couponId: string;

  @ApiProperty({ description: '订单编号' })
  @IsNotEmpty({ message: '订单编号不能为空' })
  @IsString()
  @Length(1, 64)
  orderSn: string;

  @ApiProperty({ description: '提交时间' })
  @IsNotEmpty({ message: '提交时间不能为空' })
  @IsDate()
  createTime: Date;

  @ApiProperty({ description: '用户帐号' })
  @IsOptional()
  @IsString()
  @Length(1, 64)
  memberUsername: string;

  @ApiProperty({ description: '订单总金额' })
  @IsNotEmpty({ message: '订单总金额不能为空' })
  @IsDecimal({ decimal_digits: '2' })
  totalAmount: string;

  @ApiProperty({ description: '应付金额（实际支付金额）' })
  @IsNotEmpty({ message: '应付金额不能为空' })
  @IsDecimal({ decimal_digits: '2' })
  payAmount: string;

  @ApiProperty({ description: '运费金额' })
  @IsOptional()
  @IsDecimal({ decimal_digits: '2' })
  freightAmount: string;

  @ApiProperty({ description: '促销优化金额（促销价、满减、阶梯价）' })
  @IsOptional()
  @IsDecimal({ decimal_digits: '2' })
  promotionAmount: string;

  @ApiProperty({ description: '积分抵扣金额' })
  @IsOptional()
  @IsDecimal({ decimal_digits: '2' })
  integrationAmount: string;

  @ApiProperty({ description: '优惠券抵扣金额' })
  @IsOptional()
  @IsDecimal({ decimal_digits: '2' })
  couponAmount: string;

  @ApiProperty({ description: '管理员后台调整订单使用的折扣金额' })
  @IsOptional()
  @IsDecimal({ decimal_digits: '2' })
  discountAmount: string;

  @ApiProperty({ description: '支付方式：0->未支付；1->支付宝；2->微信，3->线下现金，4->线下扫码微信,5->线下扫码支付宝' })
  @IsNotEmpty({ message: '支付方式不能为空' })
  @IsNumber()
  @Min(0)
  @Max(5)
  payType: number;

  @ApiProperty({ description: '订单来源：1->小程序订单，2->门店线下收银订单' })
  @IsNotEmpty({ message: '订单来源不能为空' })
  @IsNumber()
  @Min(1)
  @Max(2)
  sourceType: number;

  @ApiProperty({ description: '订单状态：0->待付款；1->待发货；2->已发货；3->已完成；4->已关闭；5->已取消' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(5)
  status: number;

  @ApiProperty({ description: '订单类型：0->正常订单；1->秒杀订单' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(1)
  orderType: number;

  @ApiProperty({ description: '可以获得的积分' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  integration: number;

  @ApiProperty({ description: '订单备注' })
  @IsOptional()
  @IsString()
  @Length(0, 500)
  note: string;

  @ApiProperty({ description: '确认收货状态：0->未确认；1->已确认' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(1)
  confirmStatus: number;

  @ApiProperty({ description: '删除状态：0->未删除；1->已删除' })
  @IsNumber()
  @Min(0)
  @Max(1)
  deleteStatus: number;

  @ApiProperty({ description: '下单时使用的积分数量' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  useIntegration: number;

  @ApiProperty({ description: '支付时间' })
  @IsOptional()
  @IsDate()
  paymentTime: Date;

  @ApiProperty({ description: '发货时间' })
  @IsOptional()
  @IsDate()
  deliveryTime: Date;

  @ApiProperty({ description: '确认收货时间' })
  @IsOptional()
  @IsDate()
  receiveTime: Date;

  @ApiProperty({ description: '评价时间' })
  @IsOptional()
  @IsDate()
  commentTime: Date;

  @ApiProperty({ description: '订单商品列表' })
  @IsOptional()
  @IsArray()
  orderItemList: OrderItem[];

  @ApiProperty({ description: '订单操作历史记录' })
  @IsOptional()
  @IsArray()
  historyList: OrderOperateHistory[];

  @ApiProperty({ description: '支付信息' })
  @IsOptional()
  pay: PayEntity;
}

export class OrderListDto extends IntersectionType(PagerDto<OrderDto>, PartialType(OrderDto)){
 
}

