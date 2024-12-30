import { ApiProperty, IntersectionType, PartialType } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { PagerDto } from '~/common/dto/pager.dto';
export class CreateWaterTicketDto {
  @ApiProperty({ description: '用户ID' })
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @ApiProperty({ description: '水票类型(1:单次 2:月卡 3:季卡 4:年卡)' })
  @IsNotEmpty()
  @IsNumber()
  ticketType: number;

  @ApiProperty({ description: '水票名称' })
  @IsNotEmpty()
  @IsString()
  ticketName: string;

  @ApiProperty({ description: '原价' })
  @IsNotEmpty()
  @IsNumber()
  originalPrice: number;

  @ApiProperty({ description: '实际支付价格' })
  @IsNotEmpty()
  @IsNumber()
  payPrice: number;

  @ApiProperty({ description: '剩余次数' })
  @IsNotEmpty()
  @IsNumber()
  remainingTimes: number;

  @ApiProperty({ description: '有效期开始时间' })
  @IsNotEmpty()
  @IsDate()
  validStartTime: Date;

  @ApiProperty({ description: '有效期结束时间' })
  @IsNotEmpty()
  @IsDate()
  validEndTime: Date;

  @ApiProperty({ description: '备注' })
  @IsOptional()
  @IsString()
  remark?: string;
}

export class QueryWaterTicketDto extends IntersectionType(PagerDto<CreateWaterTicketDto>, PartialType(CreateWaterTicketDto)){
  @ApiProperty({ description: '用户ID', required: false })
  @IsOptional()
  @IsNumber()
  userId?: number;

  @ApiProperty({ description: '水票类型(1:单次 2:月卡 3:季卡 4:年卡)', required: false })
  @IsOptional()
  @IsNumber()
  ticketType?: number;

  @ApiProperty({ description: '水票编号', required: false })
  @IsOptional()
  @IsString()
  ticketNo?: string;

  @ApiProperty({ description: '状态(1:未使用 2:使用中 3:已用完 4:已过期)', required: false })
  @IsOptional()
  @IsNumber()
  status?: number;
}

