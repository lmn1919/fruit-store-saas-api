import { ApiProperty, IntersectionType, PartialType, } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString
} from 'class-validator';
import { OperatorDto } from '~/common/dto/operator.dto';
import { PagerDto } from '~/common/dto/pager.dto';
import { CouponProductCategoryRelation } from '../entities/coupon-product-category-relation.entity';
import { CouponProductRelation } from '../entities/coupon-product-relation.entity';

export class CouponDto extends OperatorDto {
  @ApiProperty({
    type: String,
    description: '分类',
  })
  @IsOptional()
  @IsArray()
  productCategoryRelationList: [CouponProductCategoryRelation];

  @ApiProperty({
    type: String,
    description: '商品',
  })
  @IsOptional()
  @IsArray()
  productRelationList: [CouponProductRelation];

  @ApiProperty({
    type: Number,
    description:
      '优惠券类型；0->全场赠券；1->会员赠券；2->购物赠券；3->注册赠券；4->购买代金券',
  })
  @IsNumber()
  @IsNotEmpty({ message: '优惠券类型不能为空' })
  @Type(() => Number)
  type: number;

  @ApiProperty({
    type: String,
    description: '',
  })
  @IsString()
  @IsNotEmpty({ message: '优惠券名称不能为空' })
  name: string;

  @ApiProperty({
    type: Number,
    description: '使用平台：0->全部；1->移动；2->PC',
  })
  @IsNumber()
  @IsNotEmpty({ message: '使用平台不能为空' })
  @Type(() => Number)
  platform: number;

  @ApiProperty({
    type: Number,
    description: '发行数量',
  })
  @IsNumber()
  @IsNotEmpty({ message: '发行数量不能为空' })
  @Type(() => Number)
  publishCount: number;


  @ApiProperty({
    type: Number,
    description: '优惠类型：1->金额优惠；2->折扣优惠',
  })
  @IsNumber()
  @IsNotEmpty({ message: '优惠类型不能为空' })
  @Type(() => Number)
  saleType?: number;

  @ApiProperty({
    type: Number,
    description: '折扣',
  })
  @IsNumber()
  // @IsNotEmpty({ message: '面额不能为空' })
  @Type(() => Number)
  discount?: number;


  @ApiProperty({
    type: Number,
    description: '面额',
  })
  @IsNumber()
  // @IsNotEmpty({ message: '面额不能为空' })
  @Type(() => Number)
  amount: number;

  @ApiProperty({
    type: Number,
    description: '使用门槛；0表示无门槛',
  })
  @IsNumber()
  @IsNotEmpty({ message: '使用门槛不能为空' })
  @Type(() => Number)
  minPoint: number;

  @ApiProperty({
    type: Number,
    description: '每人限领张数',
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  perLimit: number;

  @ApiProperty({
    type: String,
    description: '可以领取的日期',
  })
  @IsOptional()
  @IsDateString()
  enableTime: Date;

  @ApiProperty({
    type: String,
    description: '有效日期',
  })
  @IsOptional()
  @IsDateString()
  startTime: Date;

  @ApiProperty({
    type: String,
    description: '有效日期',
  })
  @IsOptional()
  @IsDateString()
  endTime: Date;

  @ApiProperty({
    type: Number,
    description: '使用类型：0->全场通用；1->指定分类；2->指定商品',
  })
  @IsNumber()
  @IsNotEmpty({ message: '使用类型不能为空' })
  @Type(() => Number)
  useType: number;

  @ApiProperty({
    type: String,
    description: '备注',
  })
  @IsOptional()
  @IsString()
  note: string;


  @ApiProperty({
    type: Number,
    description: '审核状态：0-草稿；1->未审核；2->上架中；3->已下架',
  })
  @IsNumber()
  @IsNotEmpty({ message: '状态不能为空' })
  @Type(() => Number)
  status: number;
  
}

export class CouponUpdateDto extends PartialType(CouponDto) {}

export class CouponQueryDto extends IntersectionType(PagerDto<CouponDto>, PartialType(CouponDto)) {
  



  @ApiProperty({
    type: Number,
    description: '状态',
  })
  @IsOptional()
  status: number;

  @IsOptional()
  name: string;

  @ApiProperty({
    type: Number,
    description: '产品id',
  })
  @IsOptional()
  productId: number;


  @ApiProperty({
    type: String,
    description: '创建时间',
  })
  @IsOptional()
  time: string;
  
}
