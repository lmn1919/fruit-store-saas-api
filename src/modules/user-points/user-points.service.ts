import { InjectRedis } from '@liaoliaots/nestjs-redis'
import { Injectable } from '@nestjs/common'
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm'
import Redis from 'ioredis'
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
  ) { }

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
  async info(userId: number) {
    const info = await this.userPointsRepository
      .createQueryBuilder('userPoints')
      .where({
        userId,
      })
      .getOne()

    return { ...info }
  }


  /**
     * 创建用户积分
     */
  async creact({ userId, userName, userPhone, points }: UserPointsDto): Promise<string> {
 
       await this.userPointsRepository.save({
        userId, userName, userPhone, points
      })
  
      return '创建成功'
    
  
   
  }


  /**
     * 更新积分
     */
  async update({ userId, userName, userPhone, points }: UserPointsDto): Promise<string> {
  
      await this.userPointsRepository
      .createQueryBuilder()
      .update(UserPointsEntity)
      .set({ points: () => `points + ${points}` }) // points 字段增加指定的值
      .where('userId = :userId', { userId })
      .execute();

      return '修改成功'
    }
   
  


}
