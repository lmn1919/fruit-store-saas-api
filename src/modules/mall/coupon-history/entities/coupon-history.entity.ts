import { Column, Entity, Index } from 'typeorm';
import { CommonEntity } from '~/common/entity/common.entity';
@Index('idx_coupon_id', ['couponId'], {})
@Index('idx_member_id', ['memberId'], {})
@Entity('pos_coupon_history')
export class CouponHistory extends CommonEntity{
  @Column('bigint', { name: 'coupon_id', nullable: true })
  couponId: number | null;

  @Column('bigint', { name: 'coupon_name', nullable: true })
  couponName: string | null;

  @Column('bigint', { name: 'member_id', nullable: true,comment: '领取人Id', })
  memberId: number | null;

  @Column('varchar', { name: 'coupon_code', nullable: true, length: 64 })
  couponCode: string | null;

  @Column('varchar', {
    name: 'member_nickname',
    nullable: true,
    comment: '领取人昵称',
    length: 64,
  })
  memberNickname: string | null;


  @Column('varchar', {
    name: 'member_username',
    nullable: true,
    comment: '领取人用户名',
    length: 64,
  })
  memberUserName: string | null;


  @Column('varchar', {
    name: 'member_userphone',
    nullable: true,
    comment: '领取人电话',
    length: 64,
  })
  memberUserPhone: string | null;

  @Column('int', {
    name: 'get_type',
    nullable: true,
    comment: '获取类型：0->后台赠送；1->主动获取',
  })
  getType: number | null;



  @Column('int', {
    name: 'use_status',
    nullable: true,
    comment: '使用状态：0->未使用；1->已使用；2->已过期',
  })
  useStatus: number | null;

  @Column('datetime', { name: 'use_time', nullable: true, comment: '使用时间' })
  useTime: Date | null;

  @Column('bigint', { name: 'order_id', nullable: true, comment: '订单id' })
  orderId: number | null;

  @Column('varchar', {
    name: 'order_sn',
    nullable: true,
    comment: '订单号',
    length: 100,
  })
  orderSn: string | null;


}
