import { Module } from '@nestjs/common'

import { RouterModule } from '@nestjs/core'
import { BrandModule } from './brand/brand.module'
import { CouponHistoryModule } from './coupon-history/coupon-history.module'
import { CouponModule } from './coupon/coupon.module'
import { MaterialModule } from './material/material.module'
import { MemberModule } from './member/member.module'
import { ProductAttributeCategoryModule } from './product-attribute-category/product-attribute-category.module'
import { ProductAttributeModule } from './product-attribute/product-attribute.module'
import { ProductCategoryModule } from './product-category/product-category.module'
import { ProductModule } from './product/product.module'
import { ShopModule } from './shop/shop.module'
import { UserPointsRecordsModule } from './user-points-records/user-points-records.module'
import { UserPointsModule } from './user-points/user-points.module'
const modules = [
  ShopModule,
  ProductCategoryModule,
  ProductModule,
  BrandModule,
  ProductAttributeCategoryModule,
  ProductAttributeModule,
  UserPointsModule,
  UserPointsRecordsModule,
  CouponModule,
  CouponHistoryModule,
  MaterialModule,
  MemberModule
]

@Module({
  imports: [
    ...modules,
    RouterModule.register([
      {
        path: 'mall',
        module: MallModule,
        children: [...modules],
      },
    ]),
  ],
  exports: [...modules],
})
export class MallModule { }
