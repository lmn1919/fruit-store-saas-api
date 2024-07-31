// src/appointment-order/appointment-order.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { CompleteEntity } from '~/common/entity/common.entity'
@Entity('appointment_order')
export class AppointmentOrder extends CompleteEntity{

  @Column({ nullable: true })
  @ApiProperty({ description: '预约人姓名' })
  customer_name: string;

  @Column()
  @ApiProperty({ description: '预约人昵称' })
  customer_nickname: string;

  @Column()
  @ApiProperty({ description: '预约人ID' })
  customer_id: number;

  @Column()
  @ApiProperty({ description: '预约人OpenID' })
  customer_openId: string;

  @Column()
  @ApiProperty({ description: '预约状态',default: 1 })
  status: string;

  @Column({ nullable: true })
  @ApiProperty({ description: '员工姓名' })
  employee_name: string;

  @Column({ nullable: true })
  @ApiProperty({ description: '员工昵称' })
  employee_nickname: string;

  @Column({ nullable: true })
  @ApiProperty({ description: '员工ID' })
  employee_id: number;

  @Column({ nullable: true })
  @ApiProperty({ description: '员工OpenID' })
  employee_openId: string;

  @Column()
  @ApiProperty({ description: '预约项目' })
  project_name: string;

  @Column()
  @ApiProperty({ description: '预约项目ID' })
  project_id: number;

  @Column({ type: 'timestamp', nullable: true })
  @ApiProperty({ description: '订单开始时间' })
  start_time: Date;


}
