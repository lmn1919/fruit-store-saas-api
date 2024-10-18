import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne
} from 'typeorm';
import { CompleteEntity } from '~/common/entity/common.entity';
import { Product } from './product.entity';
@Entity('cms_subject_product_relation')
export class SubjectProductRelation  extends CompleteEntity{

  @ApiProperty({ description: '' })
  @Column({ type: 'bigint', name: 'product_id' })
  productId: number;

  @ApiProperty({ description: '' })
  @Column({ type: 'bigint', name: 'subject_id' })
  subjectId: number;

  @ManyToOne((type) => Product, (product) => product.subjectProductRelationList)
  @JoinColumn({ name: 'product_id' })
  product: Product;
}
