// src/tenant/tenant.entity.ts
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';
import { CompleteEntity } from '~/common/entity/common.entity';
@Entity('sys_tenant')
export class TenantEntity extends CompleteEntity{

  @Column()
  @ApiProperty({ description: '租户名' })
  name: string;

  @Column()
  @ApiProperty({ description: '租户类型' })
  type: string;

  @Column()
  @ApiProperty({ description: '状态',default: 1 })
  status: string;

  // @Column()
  // @ApiProperty({ description: '预约次数统计',default: 0 })
  // booking_count: number;

  @Column({  name: 'app_id',comment: '小程序appId' })
  @ApiProperty({ description: '小程序appId' })
  appId: string;

  //域名
  @Column({ name: 'domain_name',comment: '域名' })
  @ApiProperty({ description: '域名' })
  domainName:string;
 
  //付款时间
  @Column({ name: 'pay_time',comment: '付款时间' })
  @ApiProperty({ description: '付款时间' })
  payTime: Date;

  //到期时间
  @Column({ name: 'expire_time',comment: '到期时间' })
  @ApiProperty({ description: '到期时间' })
  expireTime: Date;
}
