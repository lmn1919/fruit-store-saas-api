import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne
} from 'typeorm';
import { CompleteEntity } from '~/common/entity/common.entity';
import { Product } from './product.entity';
@Entity('pos_product_full_reduction')
export class ProductFullReduction  extends CompleteEntity{


  @ApiProperty({ description: '' })
  @Column({ type: 'bigint', name: 'product_id' })
  productId: number;

  @ApiProperty({ description: '' })
  @Column({ type: 'decimal', name: 'full_price' })
  fullPrice: number;

  @ApiProperty({ description: '' })
  @Column({ type: 'decimal', name: 'reduce_price' })
  reducePrice: number;

  @ManyToOne((type) => Product, (product) => product.productFullReductionList)
  @JoinColumn({ name: 'product_id' })
  product: Product;
}
