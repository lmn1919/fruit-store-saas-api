import { Controller, Get, Post, Query } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

import { ApiResult } from '~/common/decorators/api-result.decorator'
import { IdParam } from '~/common/decorators/id-param.decorator'
import { ApiSecurityAuth } from '~/common/decorators/swagger.decorator'
import { AuthUser } from '~/modules/auth/decorators/auth-user.decorator'
import { Perm, definePermission } from '../auth/decorators/permission.decorator'
import { UserPointRecordsEntity } from './coupon.entity'
import { UserPointsRecordsService } from './coupon.service'
import { UserPointsRecordsDto, UserPointsRecordsQueryDto } from './dto/coupon.dto'
export const permissions = definePermission('system:user-points-records', {
  LIST: 'list',
  CREATE: 'create',
  READ: 'read',
  UPDATE: 'update',
  DELETE: 'delete',

  PASSWORD_UPDATE: 'password:update',
  PASSWORD_RESET: 'pass:reset',
} as const)

@ApiTags('System - 用户积分记录模块')
@ApiSecurityAuth()
@Controller('userPointsRecordes')
export class UserPointsRecordsController {
  constructor(
    private userPointsRecordsService: UserPointsRecordsService,
  ) {}
 

  @Get()
  @ApiOperation({ summary: '获取积分记录列表' })
  @ApiResult({ type: [UserPointRecordsEntity], isPage: true })
  @Perm(permissions.LIST)
  async list(@Query() dto: UserPointsRecordsQueryDto) {
    return this.userPointsRecordsService.list(dto)
  }

  @Get()
  @ApiOperation({ summary: '用户获取积分记录列表' })
  @ApiResult({ type: [UserPointRecordsEntity], isPage: true })
  @Perm(permissions.LIST)
  async userList(@AuthUser() user: IAuthUser,@Query() dto: UserPointsRecordsQueryDto) {
    return this.userPointsRecordsService.list({userId:user.uid,...dto})
  }

  @Get(':id')
  @ApiOperation({ summary: '获取积分记录详情' })
  @Perm(permissions.READ)
  async info(@IdParam() id: number) {
    return this.userPointsRecordsService.info(id)
  }


  @Post()
  @ApiOperation({ summary: '创建用户积分记录' })
  @Perm(permissions.CREATE)
  async creact(@Query() dto: UserPointsRecordsDto) {
    return this.userPointsRecordsService.creact(dto)
  }



}
