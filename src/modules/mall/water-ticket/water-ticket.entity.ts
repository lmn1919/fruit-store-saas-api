import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';
import { CommonEntity } from '~/common/entity/common.entity';

@Entity({ name: 'mall_water_ticket' })
export class WaterTicketEntity extends CommonEntity {
  @ApiProperty({ description: '用户ID' })
  @Column({ name: 'user_id', comment: '用户ID' })
  userId: number;

  @ApiProperty({ description: '水票编号' })
  @Column({ name: 'ticket_no', comment: '水票编号', length: 50 })
  ticketNo: string;

  @ApiProperty({ description: '水票类型(1:单次 2:月卡 3:季卡 4:年卡)' })
  @Column({ name: 'ticket_type', comment: '水票类型', type: 'tinyint' })
  ticketType: number;

  @ApiProperty({ description: '水票名称' })
  @Column({ name: 'ticket_name', comment: '水票名称', length: 50 })
  ticketName: string;

  @ApiProperty({ description: '原价' })
  @Column({ name: 'original_price', comment: '原价', type: 'decimal', precision: 10, scale: 2 })
  originalPrice: number;

  @ApiProperty({ description: '实际支付价格' })
  @Column({ name: 'pay_price', comment: '实际支付价格', type: 'decimal', precision: 10, scale: 2 })
  payPrice: number;

  @ApiProperty({ description: '剩余次数' })
  @Column({ name: 'remaining_times', comment: '剩余次数', default: 0 })
  remainingTimes: number;

  @ApiProperty({ description: '有效期开始时间' })
  @Column({ name: 'valid_start_time', comment: '有效期开始时间', type: 'timestamp' })
  validStartTime: Date;

  @ApiProperty({ description: '有效期结束时间' })
  @Column({ name: 'valid_end_time', comment: '有效期结束时间', type: 'timestamp' })
  validEndTime: Date;

  @ApiProperty({ description: '状态(1:未使用 2:使用中 3:已用完 4:已过期)' })
  @Column({ name: 'status', comment: '状态', type: 'tinyint', default: 1 })
  status: number;

  @ApiProperty({ description: '备注' })
  @Column({ name: 'remark', comment: '备注', length: 500, nullable: true })
  remark: string;
} 