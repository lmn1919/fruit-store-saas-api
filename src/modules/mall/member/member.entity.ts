// import { Exclude } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne
} from 'typeorm'
import { CommonEntity } from '~/common/entity/common.entity'
import { UserEntity } from '~/modules/user/user.entity'

@Entity({ name: 'pos_member' })
export class MemberEntity extends CommonEntity {
  // @Column({ nullable: false, name: 'user_id' })
  // @ApiProperty({ description: '用户id' })
  // userId: number


  @Column({ nullable: false, name: 'member_name' })
  @ApiProperty({ description: '会员名称' })
  memberName: string

  @Column({ nullable: false, name: 'member_phone' })
  @ApiProperty({ description: '会员手机号' })
  memberPhone: string
  
  //会员卡号
  @Column({ nullable: false, name: 'member_card_no' })
  @ApiProperty({ description: '会员卡号' })
  memberCardNo: string

  //会员等级
  @Column({ nullable: false, name: 'member_level' })
  @ApiProperty({ description: '会员等级' })
  memberLevel: number

  //性别
  @Column({ nullable: false, name: 'sex' })
  @ApiProperty({ description: '性别,1男，2女' })
  sex: number

  //年龄段
  @Column({ nullable: false, name: 'age_range' })
  @ApiProperty({ description: '年龄段，1.青年，2中年，3老年' })
  ageRange: number

  //消费能力等级
  @Column({ nullable: false, name: 'consume_level' })
  @ApiProperty({ description: '消费能力等级，1高，2中，3低' })
  consumeLevel: number

  //生日
  @Column({ nullable: false, name: 'birthday' })
  @ApiProperty({ description: '生日' })
  birthday: string

  //积分
  @Column({ nullable: false, name: 'point' })
  @ApiProperty({ description: '积分' })
  point: number
  
  @Column({ nullable: false, name: 'status' })
  @ApiProperty({ description: '状态，1启用，2禁用' })
  status: number

  //备注
  @Column({ nullable: false, name: 'remark' })
  @ApiProperty({ description: '备注' })
  remark: string

  //标签
  @Column({ nullable: false, name: 'tag' })
  @ApiProperty({ description: '标签' })
  tag: string

  @OneToOne(
    (type) => UserEntity,
    (UserEntity) => UserEntity.id,
  )
  @JoinColumn({ name: 'user_id' })
  userEntity: UserEntity;
}
