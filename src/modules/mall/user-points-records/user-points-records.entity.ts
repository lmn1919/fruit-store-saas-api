// import { Exclude } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'
import {
  Column,
  Entity,
  UpdateDateColumn
} from 'typeorm'

import { CommonEntity } from '~/common/entity/common.entity'

@Entity({ name: 'sys_user_points_records' })
export class UserPointRecordsEntity extends CommonEntity {
  @Column({ nullable: false,name:'user_id' })
  @ApiProperty({ description: '用户id' })
  userId: number

  @Column({ nullable: false,name:'user_name' })
  @ApiProperty({ description: '用户名' })
  userName: string

  @Column({ nullable: false,name:'user_phone' })
  @ApiProperty({ description: '用户手机' })
  userPhone: string

  @Column({ nullable: false, default: 0 })
  @ApiProperty({ description: '积分数' })
  points: number

  @Column({ nullable: false,name:'business_type'})
  @ApiProperty({ description: '业务类型，1=>商品购买，2=>废品回收，3=>看视频，4=>签到，5=>商品消费，6=>积分过期，7=>其他' })
  businessType: number

  @Column({ nullable: false,name:'business_type_name' })
  @ApiProperty({ description: '业务类型名称，1=>商品购买，2=>废品回收，3=>看视频，4=>签到，5=>商品消费，6=>积分过期，7=>其他' })
  businessTypeName: string

  @Column({ nullable: false, default: 0,name:'business_id' })
  @ApiProperty({ description: '业务id' })
  businessId: number

  @Column({ nullable: true, default: '' })
  @ApiProperty({ description: '备注' })
  remark: string

  @Column({ nullable: true, default: 0,name:'is_permanent' })
  @ApiProperty({ description: '是否是永久积分，1=>是，2=>否' })
  isPermanent: number

  @UpdateDateColumn({ name: 'expired_time' })
  @ApiProperty({ description: '过期时间' })
  expiredTime: Date
}
