import { ApiProperty, IntersectionType, PartialType } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'
import { PagerDto } from '~/common/dto/pager.dto'

export class RecyclingTypeDto {
  @ApiProperty({ description: '回收品类名称' })
  @IsNotEmpty({ message: '回收品类名称不能为空' })
  @IsString()
  typeName: string

  @ApiProperty({ description: '到店回收单价(元/kg)' })
  @IsNotEmpty({ message: '到店回收单价不能为空' })
  @IsNumber()
  storeUnitPrice: number

  @ApiProperty({ description: '到店回收积分单价(积分/kg)' })
  @IsNotEmpty({ message: '到店回收积分单价不能为空' })
  @IsNumber()
  storeUnitPoints: number

  @ApiProperty({ description: '上门回收单价(元/kg)' })
  @IsNotEmpty({ message: '上门回收单价不能为空' })
  @IsNumber()
  homeUnitPrice: number

  @ApiProperty({ description: '上门回收积分单价(积分/kg)' })
  @IsNotEmpty({ message: '上门回收积分单价不能为空' })
  @IsNumber()
  homeUnitPoints: number

  @ApiProperty({ description: '备注', required: false })
  @IsOptional()
  @IsString()
  remark?: string

  @ApiProperty({ description: '状态: 0-禁用 1-启用', default: 1 })
  @IsOptional()
  @IsNumber()
  status?: number

  @ApiProperty({ description: '排序', default: 0 })
  @IsOptional()
  @IsNumber()
  sort?: number
}

export class RecyclingTypeQueryDto extends IntersectionType(PagerDto<RecyclingTypeDto>, PartialType(RecyclingTypeDto)) {
  @ApiProperty({ description: '回收品类名称', example: '' })
  @IsOptional()
  @IsString()
  typeName?: string

  @ApiProperty({ description: '状态: 0-禁用 1-启用', required: false })
  @IsOptional()
  @IsNumber()
  status?: number

}


