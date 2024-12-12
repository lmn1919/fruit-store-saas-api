import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { MenuModule } from '../../system/menu/menu.module'
import { ParamConfigModule } from '../../system/param-config/param-config.module'

import { RoleModule } from '../../system/role/role.module'

import { UserPointsRecordsController } from './pay.controller'
import { MemberEntity } from './pay.entity'
import { MaterialService } from './pay.service'

const providers = [MaterialService]

@Module({
  imports: [
    TypeOrmModule.forFeature([MemberEntity]),
    RoleModule,
    MenuModule,
    ParamConfigModule,
  ],
  controllers: [UserPointsRecordsController],
  providers: [...providers],
  exports: [TypeOrmModule, ...providers],
})
export class MemberModule {}
