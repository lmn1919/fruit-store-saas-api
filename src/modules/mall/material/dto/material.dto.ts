import { ApiProperty, IntersectionType, PartialType } from '@nestjs/swagger'
import {
  IsOptional,
  IsString
} from 'class-validator'

import { OperatorDto } from '~/common/dto/operator.dto'
import { PagerDto } from '~/common/dto/pager.dto'


export class MaterialDto extends OperatorDto {


  @ApiProperty({ description: '素材名称', example: '苹果图片' })
  @IsOptional()
  @IsString()
  name: string

  @ApiProperty({ description: '素材路径' })
  @IsOptional()
  @IsString()
  path: string

  @ApiProperty({ description: '备注' })
  @IsOptional()
  @IsString()
  remark?: string

  @ApiProperty({ description: '是否是永久积分，1=>启用，2=>禁用' })
  status: number

  @ApiProperty({ description: '类型，1=>图片，2=>视频，3=>其他' })
  type: number
  
}

export class MaterialUpdateDto extends PartialType(MaterialDto) {}

export class MaterialQueryDto extends IntersectionType(PagerDto<MaterialDto>, PartialType(MaterialDto)) {
  @ApiProperty({ description: '素材名称', example: '苹果图片' })
  @IsOptional()
  @IsString()
  name: string

  @ApiProperty({ description: '类型，1=>图片，2=>视频，3=>其他' })
  type: number


  @ApiProperty({ description: '状态，1=>启用，2=>禁用' })
  status: number
}
