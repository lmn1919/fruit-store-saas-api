import { ApiProperty, IntersectionType, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString
} from 'class-validator';
import { OperatorDto } from '~/common/dto/operator.dto';
import { PagerDto } from '~/common/dto/pager.dto';

export class RecyclingDto extends OperatorDto {
  @ApiProperty({ description: '用户ID' })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  userId: number;

  @ApiProperty({ description: '用户名称' })
  @IsNotEmpty()
  @IsString()
  userName: string;

  @ApiProperty({ description: '用户手机号' })
  @IsNotEmpty()
  @IsString()
  userPhone: string;

  @ApiProperty({ description: '回收类型: 1-纸类 2-金属 3-塑料 4-其他' })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  recyclingType: number;

  @ApiProperty({ description: '重量(kg)' })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  weight: number;

  @ApiProperty({ description: '单价(元/kg)' })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  unitPrice: number;

  @ApiProperty({ description: '积分单价(积分/kg)' })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  unitPoints: number;

  @ApiProperty({ description: '总金额' })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  totalAmount: number;

  @ApiProperty({ description: '赠送积分' })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  points: number;

  @ApiProperty({ description: '状态: 0-待回收 1-已回收 2-已结算' })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  status: number;

  @ApiProperty({ description: '备注' })
  @IsOptional()
  @IsString()
  remark: string;
}

export class RecyclingUpdateDto extends PartialType(RecyclingDto) {}

export class RecyclingQueryDto extends IntersectionType(PagerDto<RecyclingDto>, PartialType(RecyclingDto)) {
  @ApiProperty({ description: '回收单号' })
  @IsOptional()
  @IsString()
  recyclingNo: string;

  @ApiProperty({ description: '用户名称' })
  @IsOptional()
  @IsString()
  userName: string;

  @ApiProperty({ description: '用户手机号' })
  @IsOptional()
  @IsString()
  userPhone: string;

  @ApiProperty({ description: '状态: 0-待回收 1-已回收 2-已结算' })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  status: number;
}
