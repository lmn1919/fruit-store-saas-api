import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { MenuModule } from '../../system/menu/menu.module'
import { ParamConfigModule } from '../../system/param-config/param-config.module'

import { RoleModule } from '../../system/role/role.module'

import { CouponController } from './coupon.controller'
import { CouponService } from './coupon.service'
import { CouponProductCategoryRelation } from './entities/coupon-product-category-relation.entity'
import { CouponProductRelation } from './entities/coupon-product-relation.entity'
import { CouponEntity } from './entities/coupon.entity'
const providers = [CouponService]

@Module({
  imports: [
    TypeOrmModule.forFeature([CouponEntity,CouponProductRelation,CouponProductCategoryRelation]),
    RoleModule,
    MenuModule,
    ParamConfigModule,
  ],
  controllers: [CouponController],
  providers: [...providers],
  exports: [TypeOrmModule, ...providers],
})
export class CouponModule {}
