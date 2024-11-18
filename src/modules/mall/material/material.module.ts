import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { MenuModule } from '../../system/menu/menu.module'
import { ParamConfigModule } from '../../system/param-config/param-config.module'

import { RoleModule } from '../../system/role/role.module'

import { UserPointsRecordsController } from './material.controller'
import { MaterialEntity } from './material.entity'
import { MaterialService } from './material.service'

const providers = [MaterialService]

@Module({
  imports: [
    TypeOrmModule.forFeature([MaterialEntity]),
    RoleModule,
    MenuModule,
    ParamConfigModule,
  ],
  controllers: [UserPointsRecordsController],
  providers: [...providers],
  exports: [TypeOrmModule, ...providers],
})
export class MaterialModule {}
