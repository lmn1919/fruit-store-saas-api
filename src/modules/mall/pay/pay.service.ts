import { InjectRedis } from '@liaoliaots/nestjs-redis'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import Redis from 'ioredis'
import { isEmpty } from 'lodash'
import { Like, Repository } from 'typeorm'
import { paginate } from '~/helper/paginate'
import { Pagination } from '~/helper/paginate/pagination'

import { PayDto, PayQueryDto } from './dto/pay.dto'
import { PayEntity } from './pay.entity'
@Injectable()
export class PayService {
  constructor(
    @InjectRedis()
    private readonly redis: Redis,


    @InjectRepository(PayEntity)
    private readonly PayMemberRepository: Repository<PayEntity>,

  ) { }

  /**
 * 查询支付记录列表
 */
  async list({
    page,
    pageSize,
    orderId,
    payStatus,
    payType
  }: PayQueryDto): Promise<Pagination<PayEntity>> {
    const queryBuilder = await this.PayMemberRepository
      .createQueryBuilder('pay')
      .where({
        ...(orderId ? { orderId: Like(`%${orderId}%`) } : null),
        ...(!isEmpty(payStatus) ? { payStatus } : null),
        ...(!isEmpty(payType) ? { payType } : null),
      })

    return paginate<PayEntity>(queryBuilder, {
      page,
      pageSize,
    })
  }

  /**
   * 获取支付记录详情
   */
  async info(id: number) {
    const info = await this.PayMemberRepository
      .createQueryBuilder('merber')
      .where({
        id,
      })
      .getOne()

    return { ...info }
  }


  /**
     * 创建支付记录
     */
  async creact(dto: PayDto): Promise<string> {
 
       await this.PayMemberRepository.save(dto)
  
      return '创建成功'
  }


  /**
     * 更新支付记录
     */
  async update(id:number,dto:PayDto): Promise<string> {
  
    await this.PayMemberRepository.update(id, dto)

    return '修改成功'
  }
}
