import { Controller, Get, Post, Put, Query } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

import { ApiResult } from '~/common/decorators/api-result.decorator'
import { IdParam } from '~/common/decorators/id-param.decorator'
import { ApiSecurityAuth } from '~/common/decorators/swagger.decorator'
import { Perm, definePermission } from '../../auth/decorators/permission.decorator'
import { MaterialDto, MaterialQueryDto } from './dto/material.dto'
import { MaterialEntity } from './material.entity'
import { MaterialService } from './material.service'
export const permissions = definePermission('system:user-points-records', {
  LIST: 'list',
  CREATE: 'create',
  READ: 'read',
  UPDATE: 'update',
  DELETE: 'delete',

  PASSWORD_UPDATE: 'password:update',
  PASSWORD_RESET: 'pass:reset',
} as const)

@ApiTags('pos - 素材物料模块')
@ApiSecurityAuth()
@Controller('material')
export class UserPointsRecordsController {
  constructor(
    private mterialService: MaterialService,
  ) {}
 

  @Get()
  @ApiOperation({ summary: '获取素材列表' })
  @ApiResult({ type: [MaterialEntity], isPage: true })
  @Perm(permissions.LIST)
  async list(@Query() dto: MaterialQueryDto) {
    return this.mterialService.list(dto)
  }


  @Get(':id')
  @ApiOperation({ summary: '获取素材详情' })
  @Perm(permissions.READ)
  async info(@IdParam() id: number) {
    return this.mterialService.info(id)
  }


  @Post()
  @ApiOperation({ summary: '新增素材' })
  @Perm(permissions.CREATE)
  async creact(@Query() dto: MaterialDto) {
    return this.mterialService.creact(dto)
  }


  @Put(':id')
  @ApiOperation({ summary: '更新素材' })
  @Perm(permissions.CREATE)
  async update(@IdParam() id: number, @Query() dto: MaterialDto) {
    return this.mterialService.update(id,dto)
  }

}
