import { Body, Controller, Delete, Get, Param, ParseArrayPipe, Post, Put, Query } from '@nestjs/common'
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger'
import { ApiResult } from '~/common/decorators/api-result.decorator'
import { IdParam } from '~/common/decorators/id-param.decorator'
import { ApiSecurityAuth } from '~/common/decorators/swagger.decorator'
import { Perm, definePermission } from '../../auth/decorators/permission.decorator'
import { CouponService } from './coupon.service'
import { CouponDto, CouponQueryDto } from './dto/coupon.dto'
// 
import { CouponEntity } from './entities/coupon.entity'
export const permissions = definePermission('system:coupon', {
  LIST: 'list',
  CREATE: 'create',
  READ: 'read',
  UPDATE: 'update',
  DELETE: 'delete',
} as const)

@ApiTags('System - 优惠券模块')
@ApiSecurityAuth()
@Controller('coupon')
export class CouponController {
  constructor(
    private couponService: CouponService,
  ) {}
 

  @Get()
  @ApiOperation({ summary: '获取优惠券列表' })
  @ApiResult({ type: [CouponEntity], isPage: true })
  @Perm(permissions.LIST)
  async list(@Query() dto: CouponQueryDto) {
    return this.couponService.list(dto)
  }

  // @Get()
  // @ApiOperation({ summary: '用户获取积分记录列表' })
  // @ApiResult({ type: [CouponEntity], isPage: true })
  // @Perm(permissions.LIST)
  // async userList(@AuthUser() user: IAuthUser,@Query() dto: UserPointsRecordsQueryDto) {
  //   return this.userPointsRecordsService.list({userId:user.uid,...dto})
  // }

  @Get(':id')
  @ApiOperation({ summary: '获取优惠券详情' })
  @Perm(permissions.READ)
  async info(@IdParam() id: number) {
    return this.couponService.info(id)
  }


  @Post()
  @ApiOperation({ summary: '创建优惠券' })
  @Perm(permissions.CREATE)
  async creact(@Query() dto: CouponDto) {
    return this.couponService.creact(dto)
  }

  @Put(':id')
  @ApiOperation({ summary: '更新优惠券'})
  @Perm(permissions.UPDATE)
  async update(@IdParam() id: number, @Body() dto: CouponDto): Promise<void> {
    await this.couponService.update(id, dto)
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除优惠券' })
  @ApiParam({ name: 'id', type: String, schema: { oneOf: [{ type: 'string' }, { type: 'number' }] } })
  @Perm(permissions.DELETE)
  async delete(@Param('id', new ParseArrayPipe({ items: Number, separator: ',' })) ids: number[]): Promise<void> {
    await this.couponService.delete(ids)
    // await this.userService.multiForbidden(ids)
  }
}
