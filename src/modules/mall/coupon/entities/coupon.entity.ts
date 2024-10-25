// import { Exclude } from 'class-transformer'
import {
  Column,
  Entity,
  OneToMany
} from 'typeorm';

import { CommonEntity } from '~/common/entity/common.entity';
import { CouponProductCategoryRelation } from './coupon-product-category-relation.entity';
import { CouponProductRelation } from './coupon-product-relation.entity';
@Entity({ name: 'sys_coupon' })




export class CouponEntity extends CommonEntity{
 

  @Column('int', {
    name: 'type',
    nullable: true,
    comment: '优惠券类型；0->全场赠券；1->会员赠券；2->购物赠券；3->注册赠券；4->购买代金券',
  })
  type: number | null;

  @Column('varchar', { name: 'name', nullable: true, length: 100 })
  name: string | null;

  @Column('int', {
    name: 'platform',
    nullable: true,
    comment: '使用平台：0->全部；1->到店使用；2->其他场景',
  })
  platform: number | null;

  @Column('int', { name: 'count', nullable: true, comment: '数量' })
  count: number | null;

  @Column('int', {
    name: 'sale_type',
    nullable: true,
    comment: '优惠类型：1->金额优惠；2->折扣优惠',
  })
  saleType: number | null;

  @Column('decimal', {
    name: 'amount',
    nullable: true,
    comment: '金额',
    precision: 10,
    scale: 2,
  })
  amount: number | null;


  @Column('decimal', {
    name: 'discount',
    nullable: true,
    comment: '折扣',
    precision: 10,
    scale: 2,
  })
  discount: number | null;
  

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

  @Column('int', { name: 'receive_count', nullable: true, comment: '价格，0为免费c1' })
  price: number | null;

  @Column('datetime', {
    name: 'enable_time',
    nullable: true,
    comment: '领取的截止时间',
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
  
  @Column({ type: 'int', name: 'status',  comment: '审核状态：0-草稿；1->未审核；2->上架中；3->已下架', })
  status: number;

  @OneToMany(
    (type) => CouponProductRelation,
    (couponProductRelation) => couponProductRelation.coupon,
  )
  productRelationList: CouponProductRelation[];

  @OneToMany(
    (type) => CouponProductCategoryRelation,
    (couponProductCategoryRelation) => couponProductCategoryRelation.coupon,
  )
  productCategoryRelationList: CouponProductCategoryRelation[];
}