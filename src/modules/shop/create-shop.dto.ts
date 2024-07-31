// src/shop/dto/create-shop.dto.ts
import { IsString, IsNumber, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateShopDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: '店铺名' })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: '省' })
  province: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: '市' })
  city: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: '区' })
  district: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: '详细地址' })
  address: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: '联系电话' })
  phone: string;

  @IsNumber()
  @ApiProperty({ description: '经度' })
  longitude: number;

  @IsNumber()
  @ApiProperty({ description: '纬度' })
  latitude: number;

  @IsString()
  @ApiProperty({ description: 'banner图' })
  banner: string;

  @IsString()
  @ApiProperty({ description: '营业时间' })
  business_hours: string;

  @IsString()
  @ApiProperty({ description: '店铺介绍' })
  description: string;

  @IsString()
  @ApiProperty({ description: '预约说明' })
  booking_instructions: string;


  
  @IsNumber()
  @ApiProperty({ description: '预约次数统计' })
  booking_count: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: '状态' })
  status: string;
}


