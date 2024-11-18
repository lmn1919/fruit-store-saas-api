// import { Exclude } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'
import {
  Column,
  Entity
} from 'typeorm'

import { CommonEntity } from '~/common/entity/common.entity'

@Entity({ name: 'pos_material' })
export class MaterialEntity extends CommonEntity {
  @Column({ nullable: false, name: 'name' })
  @ApiProperty({ description: '素材名称' })
  name: string

  @Column({ nullable: true, name: 'path' })
  @ApiProperty({ description: '素材路径' })
  path: string
  @Column({ nullable: true, default: '' })
  @ApiProperty({ description: '备注' })
  remark: string
  @Column({ nullable: false, name: 'status' })
  @ApiProperty({ description: '状态，1=>启用，2=>禁用' })
  status: number

  @Column({ nullable: false, name: 'type' })
  @ApiProperty({ description: '类型，1=>图片，2=>视频，3=>其他' })
  type: number

}
