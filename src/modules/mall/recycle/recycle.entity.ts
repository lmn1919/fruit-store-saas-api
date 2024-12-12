import { ApiProperty } from '@nestjs/swagger'
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne
} from 'typeorm'
import { CommonEntity } from '~/common/entity/common.entity'
import { UserPointsEntity } from '../user-points/user-points.entity'
@Entity({ name: 'pos_recycling' })
export class RecyclingEntity extends CommonEntity {
  @Column({ nullable: false, name: 'recycling_no' })
  @ApiProperty({ description: '回收单号' })
  recyclingNo: string

  @Column({ nullable: false, name: 'user_id' })
  @ApiProperty({ description: '用户ID' })
  userId: number

  @Column({ nullable: false, name: 'user_name' })
  @ApiProperty({ description: '用户名称' })
  userName: string

  @Column({ nullable: false, name: 'user_phone' })
  @ApiProperty({ description: '用户手机号' })
  userPhone: string

  @Column({ nullable: false, name: 'recycling_type' })
  @ApiProperty({ description: '回收类型: 1-纸类 2-金属 3-塑料 4-其他' })
  recyclingType: number

  @Column({ nullable: false, name: 'weight' })
  @ApiProperty({ description: '重量(kg)' })
  weight: number

  @Column({ nullable: true, name: 'unit_price' })
  @ApiProperty({ description: '单价(元/kg)' })
  unitPrice: number

  @Column({ nullable: true, name: 'unit_points' })
  @ApiProperty({ description: '积分单价(积分/kg)' })
  unitPoints: number


  @Column({ nullable: true, name: 'total_amount' })
  @ApiProperty({ description: '总金额' })
  totalAmount: number

  @Column({ nullable: true, name: 'points' })
  @ApiProperty({ description: '赠送积分' })
  points: number

  @Column({ nullable: true, name: 'status' })
  @ApiProperty({ description: '状态: 0-待回收 1-已回收 2-已结算' })
  status: number

  @Column({ nullable: true, name: 'remark' })
  @ApiProperty({ description: '备注' })
  remark: string

  @Column({ nullable: false, name: 'points_id' })
  @ApiProperty({ description: '关联的积分记录ID' })
  pointsId: number

  @OneToOne(() => UserPointsEntity)
  @JoinColumn({ name: 'points_id' })
  @ApiProperty({ description: '关联的积分记录' })
  userPoints: UserPointsEntity
}




