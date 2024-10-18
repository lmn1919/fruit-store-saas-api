// import { Exclude } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'
import {
  Column,
  Entity,
} from 'typeorm'

import { CommonEntity } from '~/common/entity/common.entity'

@Entity({ name: 'sys_user_points' })
export class UserPointsEntity extends CommonEntity {
  @Column({ nullable: false })
  @ApiProperty({ description: '用户id' })
  userId: number

  @Column({ nullable: false })
  @ApiProperty({ description: '用户名' })
  userName: string

  @Column({ nullable: false })
  @ApiProperty({ description: '用户手机' })
  userPhone: string

  @Column({ nullable: true, default: 0 })
  @ApiProperty({ description: '积分数' })
  points: number
}
