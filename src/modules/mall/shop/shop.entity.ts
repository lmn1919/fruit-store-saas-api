// src/shop/shop.entity.ts
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';
import { CompleteEntity } from '~/common/entity/common.entity';
@Entity('sys-shop')
export class ShopEntity  extends CompleteEntity{

  @Column()
  @ApiProperty({ description: '店铺名' })
  name: string;

  @Column()
  @ApiProperty({ description: '省' })
  province: string;

  @Column()
  @ApiProperty({ description: '市' })
  city: string;

  @Column()
  @ApiProperty({ description: '区' })
  district: string;

  @Column()
  @ApiProperty({ description: '详细地址' })
  address: string;

  @Column()
  @ApiProperty({ description: '联系电话' })
  phone: string;

  @Column('decimal', { precision: 10, scale: 6 })
  @ApiProperty({ description: '经度' })
  longitude: number;

  @Column('decimal', { precision: 10, scale: 6 })
  @ApiProperty({ description: '纬度' })
  latitude: number;

 
  @Column({ nullable: true })
  @ApiProperty({ description: 'banner图' })
  banner: string;

  @Column({ nullable: false, name: 'business_hours' })
  @ApiProperty({ description: '营业时间' })
  businessHours: string;

  @Column('text',{ nullable: true })
  @ApiProperty({ description: '店铺介绍' })
  description: string;

  @Column()
  @ApiProperty({ description: '状态' })
  status: string;
  
}
