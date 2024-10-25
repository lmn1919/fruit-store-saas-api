import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { MenuModule } from '../../system/menu/menu.module'
import { ParamConfigModule } from '../../system/param-config/param-config.module'

import { RoleModule } from '../../system/role/role.module'

import { UserPointsController } from './user-points.controller'
import { UserPointsEntity } from './user-points.entity'
import { UserPointsService } from './user-points.service'

const providers = [UserPointsService]

@Module({
  imports: [
    TypeOrmModule.forFeature([UserPointsEntity]),
    RoleModule,
    MenuModule,
    ParamConfigModule,
  ],
  controllers: [UserPointsController],
  providers: [...providers],
  exports: [TypeOrmModule, ...providers],
})
export class UserPointsModule {}
