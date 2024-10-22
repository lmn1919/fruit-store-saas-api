import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { MenuModule } from '../system/menu/menu.module'
import { ParamConfigModule } from '../system/param-config/param-config.module'

import { RoleModule } from '../system/role/role.module'

import { UserPointsRecordsController } from './coupon.controller'
import { UserPointRecordsEntity } from './coupon.entity'
import { UserPointsRecordsService } from './coupon.service'

const providers = [UserPointsRecordsService]

@Module({
  imports: [
    TypeOrmModule.forFeature([UserPointRecordsEntity]),
    RoleModule,
    MenuModule,
    ParamConfigModule,
  ],
  controllers: [UserPointsRecordsController],
  providers: [...providers],
  exports: [TypeOrmModule, ...providers],
})
export class UserPointsRecordsModule {}
