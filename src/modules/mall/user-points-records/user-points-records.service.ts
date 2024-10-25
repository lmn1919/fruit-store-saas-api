import { InjectRedis } from '@liaoliaots/nestjs-redis'
import { Injectable } from '@nestjs/common'
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm'
import Redis from 'ioredis'
import { isEmpty } from 'lodash'
import { Between, EntityManager, Like, Repository } from 'typeorm'
import { paginate } from '~/helper/paginate'
import { Pagination } from '~/helper/paginate/pagination'
import { QQService } from '~/shared/helper/qq.service'

import { ParamConfigService } from '../../system/param-config/param-config.service'

import { UserPointsRecordsDto, UserPointsRecordsQueryDto } from './dto/user-points-records.dto'
import { UserPointRecordsEntity } from './user-points-records.entity'
@Injectable()
export class UserPointsRecordsService {
  constructor(
    @InjectRedis()
    private readonly redis: Redis,


    @InjectRepository(UserPointRecordsEntity)
    private readonly userPointsRecordsRepository: Repository<UserPointRecordsEntity>,

    @InjectEntityManager() private entityManager: EntityManager,
    private readonly paramConfigService: ParamConfigService,
    private readonly qqService: QQService,
  ) { }

  /**
 * 查询积分记录列表
 */
  async list({
    page,
    pageSize,
    userName,
    userPhone,
    businessType,
    time,
    userId,
  }: UserPointsRecordsQueryDto): Promise<Pagination<UserPointRecordsEntity>> {
    const queryBuilder = await this.userPointsRecordsRepository
      .createQueryBuilder('userPointsRecords')
      .where({
        ...(userName ? { name: Like(`%${userName}%`) } : null),
        ...(userPhone ? { value: Like(`%${userPhone}%`) } : null),
        ...(time && { createdAt: Between(time[0], time[1]) }), 
        ...(!isEmpty(userId) ? { userId } : null),
        ...(!isEmpty(businessType) ? { businessType } : null),
      })

    return paginate<UserPointRecordsEntity>(queryBuilder, {
      page,
      pageSize,
    })
  }

  /**
   * 获取积分记录详情
   */
  async info(id: number) {
    const info = await this.userPointsRecordsRepository
      .createQueryBuilder('userPointsRecords')
      .where({
        id,
      })
      .getOne()

    return { ...info }
  }


  /**
     * 创建积分记录
     */
  async creact(dto: UserPointsRecordsDto): Promise<string> {
 
       await this.userPointsRecordsRepository.save(dto)
  
      return '创建成功'
  }
}
