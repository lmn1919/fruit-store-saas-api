import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne
} from 'typeorm';
import { CompleteEntity } from '~/common/entity/common.entity';
import { Product } from './product.entity';
@Entity('pos_sku_stock')
export class SkuStock  extends CompleteEntity{
 

  @ApiProperty({ description: '' })
  @Column({ type: 'bigint', name: 'product_id' })
  productId: number;

  @ApiProperty({ description: 'sku名称' })
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @ApiProperty({ description: 'sku编码' })
  @Column({ type: 'varchar', name: 'sku_code', length: 255 })
  skuCode: string;

  @ApiProperty({ description: '' })
  @Column({ type: 'decimal' })
  price: number;

  @ApiProperty({ description: '库存' })
  @Column({ type: 'int',nullable:true  })
  stock: number;

  @ApiProperty({ description: '预警库存' })
  @Column({ type: 'int', name: 'low_stock',nullable:true })
  lowStock: number;

  @ApiProperty({ description: '展示图片' })
  @Column({ type: 'varchar', length: 255,nullable:true })
  pic: string;

  @ApiProperty({ description: '销量' })
  @Column({ type: 'int',nullable:true })
  sale: number;

  @ApiProperty({ description: '单品促销价格' })
  @Column({ type: 'decimal', name: 'promotion_price',nullable:true })
  promotionPrice: number;

  @ApiProperty({ description: '锁定库存' })
  @Column({ type: 'int', name: 'lock_stock',nullable:true })
  lockStock: number;

  @ApiProperty({ description: '商品销售属性，json格式' })
  @Column({ type: 'varchar', name: 'sp_data', length: 500,nullable:true })
  spData: string;

  @ManyToOne((type) => Product, (product) => product.skuStockList)
  @JoinColumn({ name: 'product_id' })
  product: Product;
}
