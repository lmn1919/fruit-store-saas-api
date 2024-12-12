import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity } from 'typeorm'
import { CommonEntity } from '~/common/entity/common.entity'

@Entity({ name: 'pos_recycling_type' })
export class RecyclingTypeEntity extends CommonEntity {
  @Column({ nullable: false, name: 'type_name' })
  @ApiProperty({ description: '回收品类名称' })
  typeName: string

  @Column({ nullable: false, name: 'store_unit_price', type: 'decimal', precision: 10, scale: 2 })
  @ApiProperty({ description: '到店回收单价(元/kg)' })
  storeUnitPrice: number

  @Column({ nullable: false, name: 'store_unit_points' })
  @ApiProperty({ description: '到店回收积分单价(积分/kg)' })
  storeUnitPoints: number

  @Column({ nullable: false, name: 'home_unit_price', type: 'decimal', precision: 10, scale: 2 })
  @ApiProperty({ description: '上门回收单价(元/kg)' })
  homeUnitPrice: number

  @Column({ nullable: false, name: 'home_unit_points' })
  @ApiProperty({ description: '上门回收积分单价(积分/kg)' })
  homeUnitPoints: number

  @Column({ nullable: true, name: 'remark' })
  @ApiProperty({ description: '备注' })
  remark: string

  @Column({ nullable: false, name: 'status', default: 1 })
  @ApiProperty({ description: '状态: 0-禁用 1-启用' })
  status: number

  @Column({ nullable: false, name: 'sort', default: 0 })
  @ApiProperty({ description: '排序' })
  sort: number
}

