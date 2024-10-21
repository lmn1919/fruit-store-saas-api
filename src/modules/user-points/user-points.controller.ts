import { Controller, Get, Query } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

import { ApiResult } from '~/common/decorators/api-result.decorator'
import { ApiSecurityAuth } from '~/common/decorators/swagger.decorator'
import { MenuService } from '~/modules/system/menu/menu.service'

import { IdParam } from '~/common/decorators/id-param.decorator'
import { Perm, definePermission } from '../auth/decorators/permission.decorator'
import { UserPointsQueryDto } from './dto/user-points.dto'
import { UserPointsEntity } from './user-points.entity'
import { UserPointsService } from './user-points.service'
export const permissions = definePermission('system:user', {
  LIST: 'list',
  CREATE: 'create',
  READ: 'read',
  UPDATE: 'update',
  DELETE: 'delete',

  PASSWORD_UPDATE: 'password:update',
  PASSWORD_RESET: 'pass:reset',
} as const)

@ApiTags('System - 用户模块积分')
@ApiSecurityAuth()
@Controller('userPoints')
export class UserPointsController {
  constructor(
    private userPointsService: UserPointsService,
    private menuService: MenuService,
  ) {}
 

  @Get()
  @ApiOperation({ summary: '获取积分列表列表' })
  @ApiResult({ type: [UserPointsEntity], isPage: true })
  @Perm(permissions.LIST)
  async list(@Query() dto: UserPointsQueryDto) {
    return this.userPointsService.list(dto)
  }

  @Get(':userId')
  @ApiOperation({ summary: '获取用户积分' })
  @Perm(permissions.READ)
  async info(@IdParam() userId: number) {
    return this.userPointsService.info(userId)
  }
}
