// import { Exclude } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'
import {
  Column,
  Entity,
  UpdateDateColumn
} from 'typeorm'

import { CommonEntity } from '~/common/entity/common.entity'

@Entity({ name: 'sys_coupon' })
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



export class Coupon extends CommonEntity{
 

  @Column('int', {
    name: 'type',
    nullable: true,
    comment: '优惠券类型；0->全场赠券；1->会员赠券；2->购物赠券；3->注册赠券',
  })
  type: number | null;

  @Column('varchar', { name: 'name', nullable: true, length: 100 })
  name: string | null;

  @Column('int', {
    name: 'platform',
    nullable: true,
    comment: '使用平台：0->全部；1->移动；2->PC',
  })
  platform: number | null;

  @Column('int', { name: 'count', nullable: true, comment: '数量' })
  count: number | null;

  @Column('decimal', {
    name: 'amount',
    nullable: true,
    comment: '金额',
    precision: 10,
    scale: 2,
  })
  amount: number | null;

  @Column('int', { name: 'per_limit', nullable: true, comment: '每人限领张数' })
  perLimit: number | null;

  @Column('decimal', {
    name: 'min_point',
    nullable: true,
    comment: '使用门槛；0表示无门槛',
    precision: 10,
    scale: 2,
  })
  minPoint: number | null;

  @Column('datetime', { name: 'start_time', nullable: true })
  startTime: Date | null;

  @Column('datetime', { name: 'end_time', nullable: true })
  endTime: Date | null;

  @Column('int', {
    name: 'use_type',
    nullable: true,
    comment: '使用类型：0->全场通用；1->指定分类；2->指定商品',
  })
  useType: number | null;

  @Column('varchar', {
    name: 'note',
    nullable: true,
    comment: '备注',
    length: 200,
  })
  note: string | null;

  @Column('int', { name: 'publish_count', nullable: true, comment: '发行数量' })
  publishCount: number | null;

  @Column('int', { name: 'use_count', nullable: true, comment: '已使用数量' })
  useCount: number | null;

  @Column('int', { name: 'receive_count', nullable: true, comment: '领取数量' })
  receiveCount: number | null;

  @Column('datetime', {
    name: 'enable_time',
    nullable: true,
    comment: '可以领取的日期',
  })
  enableTime: Date | null;

  @Column('varchar', {
    name: 'code',
    nullable: true,
    comment: '优惠码',
    length: 64,
  })
  code: string | null;

  @Column('int', {
    name: 'member_level',
    nullable: true,
    comment: '可领取的会员类型：0->无限时',
  })
  memberLevel: number | null;

  // @OneToMany(
  //   (type) => CouponProductRelation,
  //   (couponProductRelation) => couponProductRelation.coupon,
  // )
  // productRelationList: CouponProductRelation[];

  // @OneToMany(
  //   (type) => CouponProductCategoryRelation,
  //   (couponProductCategoryRelation) => couponProductCategoryRelation.coupon,
  // )
  // productCategoryRelationList: CouponProductCategoryRelation[];
}