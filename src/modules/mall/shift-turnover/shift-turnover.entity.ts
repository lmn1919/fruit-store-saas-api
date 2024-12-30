import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';
import { CommonEntity } from '~/common/entity/common.entity';

@Entity({ name: 'mall_shift_turnover' })
export class ShiftTurnoverEntity extends CommonEntity {
  @ApiProperty({ description: '收银员ID' })
  @Column({ name: 'cashier_id', comment: '收银员ID' })
  cashierId: number;

  @ApiProperty({ description: '收银员姓名' })
  @Column({ name: 'cashier_name', comment: '收银员姓名', length: 50 })
  cashierName: string;

  @ApiProperty({ description: '交接班类型(1:上班打卡 2:下班打卡)' })
  @Column({ name: 'shift_type', comment: '交接班类型', type: 'tinyint' })
  shiftType: number;

  @ApiProperty({ description: '现金金额' })
  @Column({ name: 'cash_amount', comment: '现金金额', type: 'decimal', precision: 10, scale: 2, default: 0 })
  cashAmount: number;

  @ApiProperty({ description: '微信支付金额' })
  @Column({ name: 'wechat_amount', comment: '微信支付金额', type: 'decimal', precision: 10, scale: 2, default: 0 })
  wechatAmount: number;

  @ApiProperty({ description: '支付宝金额' })
  @Column({ name: 'alipay_amount', comment: '支付宝金额', type: 'decimal', precision: 10, scale: 2, default: 0 })
  alipayAmount: number;

  @ApiProperty({ description: '银行卡金额' })
  @Column({ name: 'card_amount', comment: '银行卡金额', type: 'decimal', precision: 10, scale: 2, default: 0 })
  cardAmount: number;

  @ApiProperty({ description: '其他支付金额' })
  @Column({ name: 'other_amount', comment: '其他支付金额', type: 'decimal', precision: 10, scale: 2, default: 0 })
  otherAmount: number;

  @ApiProperty({ description: '总金额' })
  @Column({ name: 'total_amount', comment: '总金额', type: 'decimal', precision: 10, scale: 2, default: 0 })
  totalAmount: number;

  @ApiProperty({ description: '备注' })
  @Column({ name: 'remark', comment: '备注', length: 500, nullable: true })
  remark: string;
}
