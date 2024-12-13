import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { MenuModule } from '../../system/menu/menu.module'
import { ParamConfigModule } from '../../system/param-config/param-config.module'

import { RoleModule } from '../../system/role/role.module'

import { RecyclingTypeEntity } from './recycle-type.entity'
import { RecyclingController } from './recycle.controller'
import { RecyclingEntity } from './recycle.entity'
import { RecyclingService } from './recycle.service'

const providers = [RecyclingService]

@Module({
  imports: [
    TypeOrmModule.forFeature([RecyclingEntity, RecyclingTypeEntity]),
    RoleModule,
    MenuModule,
    ParamConfigModule,
  ],
  controllers: [RecyclingController],
  providers: [...providers],
  exports: [TypeOrmModule, ...providers],
})
export class RecyclingModule {}
