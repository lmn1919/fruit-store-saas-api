// src/appointment-order/dto/create-appointment-order.dto.ts
import { IsString, IsNumber, IsNotEmpty, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAppointmentOrderDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: '预约人姓名' })
  customer_name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: '预约人昵称' })
  customer_nickname: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: '预约人ID' })
  customer_id: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: '预约人OpenID' })
  customer_openId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: '预约状态' })
  status: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: '员工姓名' })
  employee_name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: '员工昵称' })
  employee_nickname: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: '员工ID' })
  employee_id: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: '员工OpenID' })
  employee_openId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: '预约项目' })
  project_name: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: '预约项目ID' })
  project_id: number;

  @IsDate()
  @IsNotEmpty()
  @ApiProperty({ description: '订单开始时间' })
  start_time: Date;
}


