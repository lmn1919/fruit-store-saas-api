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

  @Column()
  @ApiProperty({ description: '预约次数统计',default: 0 })
  booking_count: number;
}
