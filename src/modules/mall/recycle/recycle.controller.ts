import { Controller, Delete, Get, Post, Put, Query } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

import { ApiResult } from '~/common/decorators/api-result.decorator'
import { IdParam } from '~/common/decorators/id-param.decorator'
import { ApiSecurityAuth } from '~/common/decorators/swagger.decorator'
import { Perm, definePermission } from '../../auth/decorators/permission.decorator'
import { RecyclingDto, RecyclingQueryDto } from './dto/recycle.dto'
import { RecyclingTypeEntity } from './recycle-type.entity'
import { RecyclingEntity } from './recycle.entity'
import { RecyclingService } from './recycle.service'
export const permissions = definePermission('system:user-points-records', {
  LIST: 'list',
  CREATE: 'create',
  READ: 'read',
  UPDATE: 'update',
  DELETE: 'delete',

  PASSWORD_UPDATE: 'password:update',
  PASSWORD_RESET: 'pass:reset',
} as const)

@ApiTags('pos - 废品回收管理')
@ApiSecurityAuth()
@Controller('recycling')
export class RecyclingController {
  constructor(
    private recyclingService: RecyclingService,
  ) {}
 

  @Get()
  @ApiOperation({ summary: '获取回收单列表' })
  @ApiResult({ type: [RecyclingEntity], isPage: true })
  @Perm(permissions.LIST)
  async list(@Query() dto: RecyclingQueryDto) {
    return this.recyclingService.list(dto)
  }


  @Get(':id')
  @ApiOperation({ summary: '获取回收单详情' })
  @Perm(permissions.READ)
  async info(@IdParam() id: number) {
    return this.recyclingService.info(id)
  }


  @Post()
  @ApiOperation({ summary: '新增回收单' })
  @Perm(permissions.CREATE)
  async creact(@Query() dto: RecyclingDto) {
    return this.recyclingService.creact(dto)
  }


  @Put(':id')
  @ApiOperation({ summary: '更新回收单' })
  @Perm(permissions.CREATE)
  async update(@IdParam() id: number, @Query() dto: RecyclingDto) {
    return this.recyclingService.update(id,dto)
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除回收单' })
  @Perm(permissions.DELETE)
  async delete(@IdParam() id: number) {
    return this.recyclingService.delete(id)
  }

  @Post('type')
  @ApiOperation({ summary: '创建回收类型' })
  @Perm(permissions.CREATE)
  async createRecyclingType(@Query() dto: RecyclingTypeEntity) {
    return this.recyclingService.createRecyclingType(dto)
  }

  @Put('type/:id')
  @ApiOperation({ summary: '更新回收类型' })
  @Perm(permissions.CREATE)
  async updateRecyclingType(@IdParam() id: number, @Query() dto: RecyclingTypeEntity) {
    return this.recyclingService.updateRecyclingType(id, dto)
  }

  @Delete('type/:id')
  @ApiOperation({ summary: '删除回收类型' })
  @Perm(permissions.DELETE)
  async deleteRecyclingType(@IdParam() id: number) {
    return this.recyclingService.deleteRecyclingType(id)
  }

  @Get('type')
  @ApiOperation({ summary: '获取回收类型列表' })
  @Perm(permissions.LIST)
  async listRecyclingType() {
    return this.recyclingService.listRecyclingType()
  }

  @Get('type/:id')
  @ApiOperation({ summary: '获取回收类型详情' })
  @Perm(permissions.READ)
  async infoRecyclingType(@IdParam() id: number) {
    return this.recyclingService.infoRecyclingType(id)
  }
}
