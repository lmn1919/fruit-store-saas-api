import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne
} from 'typeorm';
import { CompleteEntity } from '~/common/entity/common.entity';
import { Product } from './product.entity';
@Entity('pos_product_ladder')
export class ProductLadder  extends CompleteEntity{
 

  @ApiProperty({ description: '' })
  @Column({ type: 'bigint', name: 'product_id' })
  productId: number;

  @ApiProperty({ description: '满足的商品数量' })
  @Column({ type: 'int' })
  count: number;

  @ApiProperty({ description: '折扣' })
  @Column({ type: 'decimal' })
  discount: number;

  @ApiProperty({ description: '折后价格' })
  @Column({ type: 'decimal' })
  price: number;

  @ManyToOne((type) => Product, (product) => product.productLadderList)
  @JoinColumn({ name: 'product_id' })
  product: Product;
}
