// src/shop/shop.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { CompleteEntity } from '~/common/entity/common.entity'
@Entity('shop')
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

  @Column()
  @ApiProperty({ description: '营业时间' })
  business_hours: string;

  @Column('text',{ nullable: true })
  @ApiProperty({ description: '店铺介绍' })
  description: string;

  @Column('text',{ nullable: true })
  @ApiProperty({ description: '预约说明' })
  booking_instructions: string;

  
  @Column()
  @ApiProperty({ description: '项目' })
  projects: string;
  

  @Column()
  @ApiProperty({ description: '状态' })
  status: string;
  
  @Column()
  @ApiProperty({ description: '预约次数统计' })
  booking_count: number;
}
