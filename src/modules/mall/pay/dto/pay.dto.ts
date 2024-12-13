import { ApiProperty, IntersectionType, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { OperatorDto } from '~/common/dto/operator.dto';
import { PagerDto } from '~/common/dto/pager.dto';
export class PayDto extends OperatorDto{
  @ApiProperty({ description: '订单ID' })
  @IsNotEmpty({ message: '订单ID不能为空' })
  @IsString()
  orderId: string

  @ApiProperty({ description: '支付金额' })
  @IsNotEmpty({ message: '支付金额不能为空' })
  @IsNumber()
  amount: number

  @ApiProperty({ description: '支付方式: 1-微信 2-支付宝' })
  @IsNotEmpty({ message: '支付方式不能为空' })
  @IsNumber()
  payType: number
}

export class PayQueryDto extends IntersectionType(PagerDto<PayDto>, PartialType(PayDto)){
  @ApiProperty({ description: '订单ID', required: false })
  @IsString()
  orderId?: string

  @ApiProperty({ description: '支付状态: 0-待支付 1-支付成功 2-支付失败', required: false })
  @IsNumber()
  payStatus?: number

  @ApiProperty({ description: '支付方式: 1-微信 2-支付宝', required: false }) 
  @IsNumber()
  payType?: number
}
