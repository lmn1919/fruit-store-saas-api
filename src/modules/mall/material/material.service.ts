import { InjectRedis } from '@liaoliaots/nestjs-redis'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import Redis from 'ioredis'
import { isEmpty } from 'lodash'
import { Like, Repository } from 'typeorm'
import { paginate } from '~/helper/paginate'
import { Pagination } from '~/helper/paginate/pagination'


import { MaterialDto, MaterialQueryDto } from './dto/material.dto'
import { MaterialEntity } from './material.entity'
@Injectable()
export class MaterialService {
  constructor(
    @InjectRedis()
    private readonly redis: Redis,


    @InjectRepository(MaterialEntity)
    private readonly materialRepository: Repository<MaterialEntity>,

  ) { }

  /**
 * 查询积分记录列表
 */
  async list({
    page,
    pageSize,
    name,
    status,
    type
  }: MaterialQueryDto): Promise<Pagination<MaterialEntity>> {
    const queryBuilder = await this.materialRepository
      .createQueryBuilder('material')
      .where({
        ...(name ? { name: Like(`%${name}%`) } : null),
        ...(!isEmpty(status) ? { status } : null),
        ...(!isEmpty(type) ? { type } : null),
      })

    return paginate<MaterialEntity>(queryBuilder, {
      page,
      pageSize,
    })
  }

  /**
   * 获取积分记录详情
   */
  async info(id: number) {
    const info = await this.materialRepository
      .createQueryBuilder('material')
      .where({
        id,
      })
      .getOne()

    return { ...info }
  }


  /**
     * 创建积分记录
     */
  async creact(dto: MaterialDto): Promise<string> {
 
       await this.materialRepository.save(dto)
  
      return '创建成功'
  }


  /**
     * 更新积分
     */
  async update(id:number,dto:MaterialDto): Promise<string> {
  
    await this.materialRepository.update(id, dto)

    return '修改成功'
  }
}
