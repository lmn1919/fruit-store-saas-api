import { ApiProperty, IntersectionType, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNumber,
  IsOptional,
  IsString
} from 'class-validator';
import { OperatorDto } from '~/common/dto/operator.dto';
import { PagerDto } from '~/common/dto/pager.dto';


export class MemberDto extends OperatorDto {
  @ApiProperty({ description: '用户id' })
  @IsNumber()
  @Type(() => Number)
  userId: number

  @ApiProperty({ description: '会员名称', example: '' })
  @IsOptional()
  @IsString()
  memberName: string

  // memberPhone

  @ApiProperty({ description: '会员手机号' })
  @IsOptional()
  @IsString()
  memberPhone: string

  @ApiProperty({ description: '会员卡号' })
  @IsOptional()
  @IsString()
  memberCardNo: string



  @ApiProperty({ description: '积分' })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  point: number

  // 会员等级
  @ApiProperty({ description: '会员等级' })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  memberLevel: number

  //sex
  @ApiProperty({ description: '性别，1=>男，2=>女' })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  sex: number

  //ageRange
  @ApiProperty({ description: '年龄段，1.青年，2中年，3老年' })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  ageRange: number

  // consumeLevel
  @ApiProperty({ description: '消费能力等级，1高，2中，3低' })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  consumeLevel: number

  // birthday
  @ApiProperty({ description: '生日' })
  @IsOptional()
  @IsString()
  birthday: string


  @ApiProperty({ description: '备注' })
  @IsOptional()
  @IsString()
  remark?: string

  @ApiProperty({ description: '是否是永久积分，1=>启用，2=>禁用' })
  status: number

  //tag
  @ApiProperty({ description: '标签' })
  @IsOptional()
  @IsString()
  tag: string
}

export class MemberUpdateDto extends PartialType(MemberDto) {}

export class MemberQueryDto extends IntersectionType(PagerDto<MemberDto>, PartialType(MemberDto)) {
  @ApiProperty({ description: '会员名称', example: '' })
  @IsOptional()
  @IsString()
  memberName: string

  @ApiProperty({ description: '会员卡号' })
  @IsOptional()
  @IsString()
  memberCardNo: string

  @ApiProperty({ description: '会员手机号' })
  @IsOptional()
  @IsString()
  memberPhone: string

  @ApiProperty({ description: '状态，1=>启用，2=>禁用' })
  status: number


}
