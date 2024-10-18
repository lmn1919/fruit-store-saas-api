import { Controller, Get, Query } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

import { ApiResult } from '~/common/decorators/api-result.decorator'
import { ApiSecurityAuth } from '~/common/decorators/swagger.decorator'
import { MenuService } from '~/modules/system/menu/menu.service'

import { Perm, definePermission } from '../auth/decorators/permission.decorator'
import { UserQueryDto } from './dto/user-points.dto'
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

@ApiTags('System - 用户模块')
@ApiSecurityAuth()
@Controller('users')
export class UserController {
  constructor(
    private userService: UserPointsService,
    private menuService: MenuService,
  ) {}
 

  @Get()
  @ApiOperation({ summary: '获取用户列表' })
  @ApiResult({ type: [UserPointsEntity], isPage: true })
  @Perm(permissions.LIST)
  async list(@Query() dto: UserQueryDto) {
    // return this.userService.list(dto)
  }


}
