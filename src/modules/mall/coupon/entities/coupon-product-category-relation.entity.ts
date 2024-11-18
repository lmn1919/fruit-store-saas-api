import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne
} from 'typeorm';
import { CommonEntity } from '~/common/entity/common.entity';
import { CouponEntity } from './coupon.entity';
@Entity('pos_coupon_product_category_relation')
export class CouponProductCategoryRelation extends CommonEntity{


  @Column('bigint', { name: 'coupon_id', nullable: true })
  couponId: string | null;

  @Column('bigint', { name: 'product_category_id', nullable: true })
  productCategoryId: string | null;

  @Column('varchar', {
    name: 'product_category_name',
    nullable: true,
    comment: '产品分类名称',
    length: 200,
  })
  productCategoryName: string | null;

  @Column('varchar', {
    name: 'parent_category_name',
    nullable: true,
    comment: '父分类名称',
    length: 200,
  })
  parentCategoryName: string | null;

  @ManyToOne((type) => CouponEntity, (coupon) => coupon.productCategoryRelationList)
  @JoinColumn({ name: 'coupon_id' })
  coupon: CouponEntity;
}
