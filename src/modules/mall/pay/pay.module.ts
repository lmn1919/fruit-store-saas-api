import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { MenuModule } from '../../system/menu/menu.module'
import { ParamConfigModule } from '../../system/param-config/param-config.module'

import { RoleModule } from '../../system/role/role.module'

import { PayController } from './pay.controller'
import { PayEntity } from './pay.entity'
import { PayService } from './pay.service'

const providers = [PayService]

@Module({
  imports: [
    TypeOrmModule.forFeature([PayEntity]),
    RoleModule,
    MenuModule,
    ParamConfigModule,
  ],
  controllers: [PayController],
  providers: [...providers],
  exports: [TypeOrmModule, ...providers],
})
export class PayModule {}
