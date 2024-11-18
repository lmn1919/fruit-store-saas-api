import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne
} from 'typeorm';
import { CompleteEntity } from '~/common/entity/common.entity';
import { Product } from './product.entity';
@Entity('pos_member_price')
export class MemberPrice extends CompleteEntity{
  @ApiProperty({ description: '' })
  @Column({ type: 'bigint', name: 'product_id' })
  productId: number;

  @ApiProperty({ description: '' })
  @Column({ type: 'bigint', name: 'member_level_id' })
  memberLevelId: number;

  @ApiProperty({ description: '会员价格' })
  @Column({ type: 'decimal', name: 'member_price' })
  memberPrice: number;

  @ApiProperty({ description: '' })
  @Column({ type: 'varchar', name: 'member_level_name' })
  memberLevelName: string;

  @ManyToOne((type) => Product, (product) => product.memberPriceList)
  @JoinColumn({ name: 'product_id' })
  product: Product;
}
