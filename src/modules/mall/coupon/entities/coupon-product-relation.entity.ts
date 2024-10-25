import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne
} from 'typeorm';
import { CommonEntity } from '~/common/entity/common.entity';
import { CouponEntity } from './coupon.entity';
@Entity('sys_coupon_product_relation')
export class CouponProductRelation extends CommonEntity{


  @Column('bigint', { name: 'coupon_id', nullable: true })
  couponId: string | null;

  @Column('bigint', { name: 'product_id', nullable: true })
  productId: string | null;

  @Column('varchar', {
    name: 'product_name',
    nullable: true,
    comment: '商品名称',
    length: 500,
  })
  productName: string | null;

  @Column('varchar', {
    name: 'product_sn',
    nullable: true,
    comment: '商品编码',
    length: 200,
  })
  productSn: string | null;

  @ManyToOne((type) => CouponEntity, (coupon) => coupon.productRelationList)
  @JoinColumn({ name: 'coupon_id' })
  coupon: CouponEntity;
}
