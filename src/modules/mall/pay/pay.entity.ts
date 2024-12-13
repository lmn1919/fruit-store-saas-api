import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm'
import { CommonEntity } from '~/common/entity/common.entity'
import { OrderEntity } from '../order/entities/order.entity'

@Entity({ name: 'mall_pay' })
export class PayEntity extends CommonEntity {
  @ApiProperty({ description: '订单ID' })
  @Column({ name: 'order_id', comment: '订单ID' })
  orderId: string

  @ApiProperty({ description: '支付金额' })
  @Column({ type: 'decimal', precision: 10, scale: 2, comment: '支付金额' })
  amount: number

  @ApiProperty({ description: '支付方式: 1-微信 2-支付宝' })
  @Column({ name: 'pay_type', comment: '支付方式: 1-微信 2-支付宝', type: 'tinyint' })
  payType: number

  @ApiProperty({ description: '支付状态: 0-待支付 1-支付成功 2-支付失败' })
  @Column({ name: 'pay_status', comment: '支付状态: 0-待支付 1-支付成功 2-支付失败', type: 'tinyint', default: 0 })
  payStatus: number

  @ApiProperty({ description: '支付时间' })
  @Column({ name: 'pay_time', comment: '支付时间', type: 'datetime', nullable: true })
  payTime: Date

  @ApiProperty({ description: '第三方支付流水号' })
  @Column({ name: 'transaction_id', comment: '第三方支付流水号', nullable: true })
  transactionId: string

  @ApiProperty({ description: '支付失败原因' })
  @Column({ name: 'fail_reason', comment: '支付失败原因', nullable: true })
  failReason: string

  @OneToOne(() => OrderEntity)
  @JoinColumn({ name: 'order_id' })
  @ApiProperty({ description: '订单信息' })
  order: OrderEntity
}



