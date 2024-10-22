import { ApiProperty, IntersectionType, PartialType } from '@nestjs/swagger'
import {
  IsArray,
  IsOptional,
  IsString
} from 'class-validator'

import { OperatorDto } from '~/common/dto/operator.dto'
import { PagerDto } from '~/common/dto/pager.dto'


export class UserPointsRecordsDto extends OperatorDto {
  @ApiProperty({ description: '用户id' })
  userId: number

  @ApiProperty({ description: '用户名', example: '刘发财' })
  @IsOptional()
  @IsString()
  userName: string

  @ApiProperty({ description: '手机号' })
  @IsOptional()
  @IsString()
  userPhone?: string

  @ApiProperty({ description: '积分数' })
  points: number

  @ApiProperty({ description: '业务类型' })
  businessType: number


  @ApiProperty({ description: '业务类型名称' })
  @IsString()
  businessTypeName: string


  @ApiProperty({ description: '业务类型Id' })
  businessId: number

  @ApiProperty({ description: '备注' })
  @IsOptional()
  @IsString()
  remark?: string

  @ApiProperty({ description: '是否是永久积分，1=>是，2=>否' })
  isPermanent: number

  @ApiProperty({ description: '过期时间' })
  expiredTime?: string
}

export class UserPointsRecordsUpdateDto extends PartialType(UserPointsRecordsDto) {}

export class UserPointsRecordsQueryDto extends IntersectionType(PagerDto<UserPointsRecordsDto>, PartialType(UserPointsRecordsDto)) {
  @ApiProperty({ description: '用户id' })
  userId: number

  @ApiProperty({ description: '用户名', required: false })
  @IsString()
  userName?: string

  @ApiProperty({ description: '手机号', required: false })
  @IsString()
  userPhone: string

  @ApiProperty({ description: '业务类型' })
  businessType: number

  @ApiProperty({ description: '业务类型Id' })
  businessId: number

  
  @ApiProperty({ description: '获得时间' })
  @IsOptional()
  @IsArray()
  time?: string[]
}
