import { Controller, Get, Post, Put, Query } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

import { ApiResult } from '~/common/decorators/api-result.decorator'
import { IdParam } from '~/common/decorators/id-param.decorator'
import { ApiSecurityAuth } from '~/common/decorators/swagger.decorator'
import { Perm, definePermission } from '../../auth/decorators/permission.decorator'
import { PayDto, PayQueryDto } from './dto/pay.dto'
import { PayEntity } from './pay.entity'
import { PayService } from './pay.service'
export const permissions = definePermission('system:user-points-records', {
  LIST: 'list',
  CREATE: 'create',
  READ: 'read',
  UPDATE: 'update',
  DELETE: 'delete',

  PASSWORD_UPDATE: 'password:update',
  PASSWORD_RESET: 'pass:reset',
} as const)

@ApiTags('pos - 支付单管理')
@ApiSecurityAuth()
@Controller('pay')
export class PayController {
  constructor(
    private payService: PayService,
  ) {}
 

  @Get()
  @ApiOperation({ summary: '获取支付单列表' })
  @ApiResult({ type: [PayEntity], isPage: true })
  @Perm(permissions.LIST)
  async list(@Query() dto: PayQueryDto) {
      return this.payService.list(dto)
  }


  @Get(':id')
  @ApiOperation({ summary: '获取支付单详情' })
  @Perm(permissions.READ)
  async info(@IdParam() id: number) {
    return this.payService.info(id)
  }


  @Post()
  @ApiOperation({ summary: '新增支付单' })
  @Perm(permissions.CREATE)
  async creact(@Query() dto: PayDto) {
    return this.payService.creact(dto)
  }


  @Put(':id')
  @ApiOperation({ summary: '更新支付单' })
  @Perm(permissions.CREATE)
  async update(@IdParam() id: number, @Query() dto: PayDto) {
    return this.payService.update(id,dto)
  }

}
