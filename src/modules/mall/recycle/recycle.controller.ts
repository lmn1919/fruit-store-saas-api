import { Controller, Get, Post, Put, Query } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

import { ApiResult } from '~/common/decorators/api-result.decorator'
import { IdParam } from '~/common/decorators/id-param.decorator'
import { ApiSecurityAuth } from '~/common/decorators/swagger.decorator'
import { Perm, definePermission } from '../../auth/decorators/permission.decorator'
import { MemberDto, MemberQueryDto } from './dto/recycle.dto'
import { MemberEntity } from './recycle.entity'
import { MaterialService } from './recycle.service'
export const permissions = definePermission('system:user-points-records', {
  LIST: 'list',
  CREATE: 'create',
  READ: 'read',
  UPDATE: 'update',
  DELETE: 'delete',

  PASSWORD_UPDATE: 'password:update',
  PASSWORD_RESET: 'pass:reset',
} as const)

@ApiTags('pos - 会员管理')
@ApiSecurityAuth()
@Controller('merber')
export class UserPointsRecordsController {
  constructor(
    private mterialService: MaterialService,
  ) {}
 

  @Get()
  @ApiOperation({ summary: '获取会员列表' })
  @ApiResult({ type: [MemberEntity], isPage: true })
  @Perm(permissions.LIST)
  async list(@Query() dto: MemberQueryDto) {
    return this.mterialService.list(dto)
  }


  @Get(':id')
  @ApiOperation({ summary: '获取会员详情' })
  @Perm(permissions.READ)
  async info(@IdParam() id: number) {
    return this.mterialService.info(id)
  }


  @Post()
  @ApiOperation({ summary: '新增会员' })
  @Perm(permissions.CREATE)
  async creact(@Query() dto: MemberDto) {
    return this.mterialService.creact(dto)
  }


  @Put(':id')
  @ApiOperation({ summary: '更新会员' })
  @Perm(permissions.CREATE)
  async update(@IdParam() id: number, @Query() dto: MemberDto) {
    return this.mterialService.update(id,dto)
  }

}
