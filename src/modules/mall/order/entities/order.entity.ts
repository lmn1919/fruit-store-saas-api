import { Column, Entity, OneToMany, OneToOne } from 'typeorm';
import { CommonEntity } from '~/common/entity/common.entity';
import { PayEntity } from '../../pay/pay.entity';
import { OrderItemEntity } from './order-item.entity';
import { OrderOperateHistory } from './order-operate-history.entity';
@Entity('pos_order', { schema: 'mallshop' })
export class OrderEntity extends CommonEntity {

  @Column('bigint', { name: 'member_id', nullable: true })
  memberId: string;

  @Column('bigint', { name: 'coupon_id', nullable: true })
  couponId: string | null;

  @Column('varchar', {
    name: 'order_sn',
    nullable: false,
    comment: '订单编号',
    length: 64,
  })
  orderSn: string | null;

  @Column('datetime', {
    name: 'create_time',
    nullable: false,
    comment: '提交时间',
  })
  createTime: Date | null;

  @Column('varchar', {
    name: 'member_username',
    nullable: true,
    comment: '用户帐号',
    length: 64,
  })
  memberUsername: string | null;

  @Column('decimal', {
    name: 'total_amount',
    nullable: false,
    comment: '订单总金额',
    precision: 10,
    scale: 2,
  })
  totalAmount: string | null;

  @Column('decimal', {
    name: 'pay_amount',
    nullable: false,
    comment: '应付金额（实际支付金额）',
    precision: 10,
    scale: 2,
  })
  payAmount: string | null;

  @Column('decimal', {
    name: 'freight_amount',
    nullable: true,
    comment: '运费金额',
    precision: 10,
    scale: 2,
  })
  freightAmount: string | null;

  @Column('decimal', {
    name: 'promotion_amount',
    nullable: true,
    comment: '促销优化金额（促销价、满减、阶梯价）',
    precision: 10,
    scale: 2,
  })
  promotionAmount: string | null;

  @Column('decimal', {
    name: 'integration_amount',
    nullable: true,
    comment: '积分抵扣金额',
    precision: 10,
    scale: 2,
  })
  integrationAmount: string | null;


  @Column('decimal', {
    name: 'coupon_amount',
    nullable: true,
    comment: '优惠券抵扣金额',
    precision: 10,
    scale: 2,
  })
  couponAmount: string | null;

  

  @Column('decimal', {
    name: 'discount_amount',
    nullable: true,
    comment: '管理员后台调整订单使用的折扣金额',
    precision: 10,
    scale: 2,
  })
  discountAmount: string | null;

  @Column('int', {
    name: 'pay_type',
    nullable: false,
    comment: '支付方式：0->未支付；1->支付宝；2->微信，3->线下现金，4->线下扫码微信,5->线下扫码支付宝',
  })
  payType: number | null;

  @Column('int', {
    name: 'source_type',
    nullable: false,
    comment: '订单来源：1->小程序订单，2->门店线下收银订单',
  })
  sourceType: number | null;

  @Column('int', {
    name: 'status',
    nullable: true,
    comment:
      '订单状态：0->待付款；1->待发货；2->已发货；3->已完成；4->已关闭；5->已取消',
  })
  status: number | null;

  @Column('int', {
    name: 'order_type',
    nullable: true,
    comment: '订单类型：0->正常订单；1->秒杀订单',
  })
  orderType: number | null;

  @Column('int', {
    name: 'integration',
    nullable: true,
    comment: '可以获得的积分',
  })
  integration: number | null;

  @Column('varchar', {
    name: 'note',
    nullable: true,
    comment: '订单备注',
    length: 500,
  })
  note: string | null;

  @Column('int', {
    name: 'confirm_status',
    nullable: true,
    comment: '确认收货状态：0->未确认；1->已确认',
  })
  confirmStatus: number | null;

  @Column('int', {
    name: 'delete_status',
    comment: '删除状态：0->未删除；1->已删除',
    default: () => "0",
  })
  deleteStatus: number;

  @Column('int', {
    name: 'use_integration',
    nullable: true,
    comment: '下单时使用的积分数量',
  })
  useIntegration: number | null;

  @Column('datetime', {
    name: 'payment_time',
    nullable: true,
    comment: '支付时间',
  })
  paymentTime: Date | null;

  @Column('datetime', {
    name: 'delivery_time',
    nullable: true,
    comment: '发货时间',
  })
  deliveryTime: Date | null;

  @Column('datetime', {
    name: 'receive_time',
    nullable: true,
    comment: '确认收货时间',
  })
  receiveTime: Date | null;

  @Column('datetime', {
    name: 'comment_time',
    nullable: true,
    comment: '评价时间',
  })
  commentTime: Date | null;


  @OneToMany((type) => OrderItemEntity, (orderItem) => orderItem.order)
  orderItemList: OrderItemEntity[];

  @OneToMany((type) => OrderOperateHistory, (orderOper) => orderOper.order)
  historyList: OrderOperateHistory[];

  @OneToOne(() => PayEntity, (pay) => pay.order)
  pay: PayEntity;
}
