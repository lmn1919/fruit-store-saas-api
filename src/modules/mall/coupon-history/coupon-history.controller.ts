import {
  Body,
  Controller,
  Get,
  Post,
  Query
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Perm, definePermission } from '../../auth/decorators/permission.decorator';
import { CouponHistoryService } from './coupon-history.service';
import { CouponHistoryCreact, CouponHistorySearchDto } from './dto/coupon-history.dto';
export const permissions = definePermission('system:user', {
  LIST: 'list',
  CREATE: 'create',
  READ: 'read',
  UPDATE: 'update',
  DELETE: 'delete',

  PASSWORD_UPDATE: 'password:update',
  PASSWORD_RESET: 'pass:reset',
} as const)
@ApiTags('优惠券领取记录管理')
@Controller('couponHistory')
export class CouponHistoryController {
  constructor(private readonly couponHistoryService: CouponHistoryService) {}



  @Post()
  @ApiOperation({ summary: '新增用户' })
  @Perm(permissions.CREATE)
  async create(@Body() dto: CouponHistoryCreact): Promise<void> {
    await this.couponHistoryService.create(dto)
  }

  @ApiOperation({
    summary: '根据优惠券id，使用状态，订单编号分页获取领取记录',
  })
  @Get('list')
  async findAll(@Query() search: CouponHistorySearchDto) {

    return await this.couponHistoryService.list(search);
  }
}
