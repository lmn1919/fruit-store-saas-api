import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { MenuModule } from '../../system/menu/menu.module'
import { ParamConfigModule } from '../../system/param-config/param-config.module'

import { RoleModule } from '../../system/role/role.module'

import { UserPointsRecordsController } from './member.controller'
import { MemberEntity } from './member.entity'
import { MaterialService } from './member.service'

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
