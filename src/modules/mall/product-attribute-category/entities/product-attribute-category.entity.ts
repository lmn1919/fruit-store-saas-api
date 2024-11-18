import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany } from 'typeorm';
import { CompleteEntity } from '~/common/entity/common.entity';
import { ProductAttribute } from '~/modules/mall/product-attribute/entities/product-attribute.entity';
@Entity('pos_product_attribute_category')
export class ProductAttributeCategory extends CompleteEntity {
  // @ApiProperty({ description: '自增 id' })
  // @PrimaryGeneratedColumn({ type: 'bigint' })
  // id: number;

  @ApiProperty({ description: '' })
  @Column({ type: 'varchar', length: '64' })
  name: string;

  @ApiProperty({ description: '属性数量' })
  @Column({ type: 'int', name: 'attribute_count' })
  attributeCount: number;

  @ApiProperty({ description: '参数数量' })
  @Column({ type: 'int', name: 'param_count' })
  paramCount: number;

  @OneToMany(
    (type) => ProductAttribute,
    (productAttribute) => productAttribute.productAttributeCategory,
  )
  productAttributeList: ProductAttribute[];
}
