import { ApiProperty, IntersectionType, PartialType } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { OperatorDto } from '~/common/dto/operator.dto';
import { PagerDto } from '~/common/dto/pager.dto';
export class CouponHistoryDto extends OperatorDto {
  @ApiProperty({
    type: Number,
    description: '优惠券id',
  })
  @IsOptional()
  couponId: number;

  
  @ApiProperty({
    type: String,
    description: '优惠券名称',
  })
  @IsOptional()
  couponName: string;

  @ApiProperty({
    type: Number,
    description: '领取人id',
  })
  @IsNumber()
  memberId?: number;

  @ApiProperty({
    type: String,
    description: '优惠券编码',
  })
  @IsString()
  couponCode?: string;

  @ApiProperty({
    type: String,
    description: '领取人昵称',
  })
  @IsString()
  memberNickname?: string;


  @ApiProperty({
    type: String,
    description: '领取人名称',
  })
  @IsString()
  memberUserName?: string;


  @ApiProperty({
    type: String,
    description: '领取人手机',
  })
  @IsString()
  memberUserPhone: string;


  @ApiProperty({
    type: Number,
    description: '获取类型：0->后台赠送；1->主动获取',
  })
  @IsNumber()
  @IsOptional()
  getType?: number;

  @ApiProperty({
    type: Number,
    description: '订单id',
  })
  @IsNumber()
  @IsOptional()
  orderId?: number;
  

  @ApiProperty({
    type: Number,
    description: '使用状态：0->未使用；1->已使用；2->已过期',
  })
  @IsNumber()
  @IsOptional()
  useStatus: number;


  @ApiProperty({
    type: String,
    description: '订单号',
  })
  @IsString()
  @IsOptional()
  orderSn: string;


  
}



export class CouponHistoryUpdateDto extends PartialType(CouponHistoryDto) {
  @ApiProperty({
    type: String,
    description: '使用时间',
  })
  @IsString()
  @IsOptional()
  useTime: string;
}

export class CouponHistorySearchDto extends IntersectionType(PagerDto<CouponHistoryDto>, PartialType(CouponHistoryDto)) {
  
  @IsOptional()
  couponId: number;

  @IsOptional()
  useStatus: number;

  @IsOptional()
  orderSn: string;
  
}



export class CouponHistoryCreact {
  @ApiProperty({
    type: Number,
    description: '优惠券id',
  })
  @IsOptional()
  couponId: number;


  @ApiProperty({
    type: Number,
    description: '领取人id',
  })
  @IsNumber()
  memberId?: number;
}
