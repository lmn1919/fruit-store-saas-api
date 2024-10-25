import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne
} from 'typeorm';
import { CompleteEntity } from '~/common/entity/common.entity';
import { Product } from './product.entity';
@Entity('cms_prefrence_area_product_relation')
export class PrefrenceAreaProductRelation extends CompleteEntity{
  @ApiProperty({ description: '' })
  @Column({ type: 'bigint', name: 'product_id' })
  productId: number;

  @ApiProperty({ description: '' })
  @Column({ type: 'bigint', name: 'prefrence_area_id' })
  prefrenceAreaId: number;

  @ManyToOne(
    (type) => Product,
    (product) => product.prefrenceAreaProductRelationList,
  )
  @JoinColumn({ name: 'product_id' })
  product: Product;
}
