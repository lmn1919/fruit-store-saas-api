import { InjectRedis } from '@liaoliaots/nestjs-redis'
import { Injectable } from '@nestjs/common'
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm'
import Redis from 'ioredis'
import { isEmpty } from 'lodash'
import { EntityManager, Like, Repository } from 'typeorm'


import { paginate } from '~/helper/paginate'
import { Pagination } from '~/helper/paginate/pagination'
import { QQService } from '~/shared/helper/qq.service'

import { ParamConfigService } from '../system/param-config/param-config.service'

import { UserPointsDto, UserPointsQueryDto } from './dto/user-points.dto'
import { UserPointsEntity } from './user-points.entity'
@Injectable()
export class UserPointsService {
  constructor(
    @InjectRedis()
    private readonly redis: Redis,


    @InjectRepository(UserPointsEntity)
    private readonly userPointsRepository: Repository<UserPointsEntity>,

    @InjectEntityManager() private entityManager: EntityManager,
    private readonly paramConfigService: ParamConfigService,
    private readonly qqService: QQService,
  ) {}

    /**
   * 查询积分列表
   */
    async list({
      page,
      pageSize,
      userName,
      userPhone,
      
    }: UserPointsQueryDto): Promise<Pagination<UserPointsEntity>> {
      const queryBuilder = await this.userPointsRepository
        .createQueryBuilder('userPoints')
        .where({
          ...(userName ? { name: Like(`%${userName}%`) } : null),
          ...(userPhone ? { value: Like(`%${userPhone}%`) } : null),
         
        })
  
      return paginate<UserPointsEntity>(queryBuilder, {
        page,
        pageSize,
      })
    }
  
    /**
     * 获取用户的积分
     */
    async info(id: number) {
      const info = await this.userPointsRepository
        .createQueryBuilder('userPoints')
        .where({
          id,
        })
        .getOne()

      return { ...info }
    }


/**
   * 注册
   */
async creact({ userId,  }: UserPointsDto): Promise<void> {
  const exists = await this.userPointsRepository.findOneBy({
    userId,
  })
  if (!isEmpty(exists))
    throw new BusinessException(ErrorEnum.SYSTEM_USER_EXISTS)

  await this.entityManager.transaction(async (manager) => {


    const u = manager.create(UserEntity, {
      username,
      password,
      status: 1,
      psalt: salt,
    })

    const user = await manager.save(u)

    return user
  })
}




}
