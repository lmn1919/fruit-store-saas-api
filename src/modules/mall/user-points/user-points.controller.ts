import { Controller, Get, Post, Put, Query } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

import { ApiResult } from '~/common/decorators/api-result.decorator'
import { ApiSecurityAuth } from '~/common/decorators/swagger.decorator'
import { Perm, definePermission } from '../../auth/decorators/permission.decorator'
import { UserPointsDto, UserPointsQueryDto } from './dto/user-points.dto'
import { UserPointsEntity } from './user-points.entity'
import { UserPointsService } from './user-points.service'
export const permissions = definePermission('system:user-points', {
  LIST: 'list',
  CREATE: 'create',
  READ: 'read',
  UPDATE: 'update',
  DELETE: 'delete',

  PASSWORD_UPDATE: 'password:update',
  PASSWORD_RESET: 'pass:reset',
} as const)

@ApiTags('System - 用户积分模块')
@ApiSecurityAuth()
@Controller('userPoints')
export class UserPointsController {
  constructor(
    private userPointsService: UserPointsService,

  ) {}
 

  @Get()
  @ApiOperation({ summary: '获取积分列表' })
  @ApiResult({ type: [UserPointsEntity], isPage: true })
  @Perm(permissions.LIST)
  async list(@Query() dto: UserPointsQueryDto) {
    return this.userPointsService.list(dto)
  }

  @Get(':userId')
  @ApiOperation({ summary: '获取用户积分' })
  @Perm(permissions.READ)
  async info(@Query() userId: number) {
    return this.userPointsService.info(userId)
  }


  @Post()
  @ApiOperation({ summary: '创建用户积分账户' })
  @Perm(permissions.CREATE)
  async creact(@Query() dto: UserPointsDto) {
    return this.userPointsService.creact(dto)
  }

  @Put(':userId')
  @ApiOperation({ summary: '更新积分' })
  @Perm(permissions.UPDATE)
  async update(@Query() dto: UserPointsDto): Promise<void> {
    await this.userPointsService.update(dto)
 
  }

}
