import { ApiProperty, IntersectionType, PartialType } from '@nestjs/swagger'
import {
  IsOptional,
  IsString
} from 'class-validator'

import { OperatorDto } from '~/common/dto/operator.dto'
import { PagerDto } from '~/common/dto/pager.dto'


export class UserPointsDto extends OperatorDto {
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
}

export class UserPointsUpdateDto extends PartialType(UserPointsDto) {}

export class UserPointsQueryDto extends IntersectionType(PagerDto<UserPointsDto>, PartialType(UserPointsDto)) {
  @ApiProperty({ description: '用户id' })
  userId: number

  @ApiProperty({ description: '用户名', required: false })
  @IsString()
  userName?: string

  @ApiProperty({ description: '手机号', required: false })
  @IsString()
  userPhone: string
}
