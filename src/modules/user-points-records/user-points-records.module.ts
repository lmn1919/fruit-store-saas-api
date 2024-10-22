import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { MenuModule } from '../system/menu/menu.module'
import { ParamConfigModule } from '../system/param-config/param-config.module'

import { RoleModule } from '../system/role/role.module'

import { UserPointsRecordsController } from './user-points-records.controller'
import { UserPointRecordsEntity } from './user-points-records.entity'
import { UserPointsRecordsService } from './user-points-records.service'

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
