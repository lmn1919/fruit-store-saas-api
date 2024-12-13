import { InjectRedis } from '@liaoliaots/nestjs-redis'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import Redis from 'ioredis'
import { isEmpty } from 'lodash'
import { Like, Repository } from 'typeorm'
import { paginate } from '~/helper/paginate'
import { Pagination } from '~/helper/paginate/pagination'


import { RecyclingDto, RecyclingQueryDto } from './dto/recycle.dto'
import { RecyclingTypeEntity } from './recycle-type.entity'
import { RecyclingEntity } from './recycle.entity'
@Injectable()
export class RecyclingService {
  constructor(
    @InjectRedis()
    private readonly redis: Redis,


    @InjectRepository(RecyclingEntity)
    private readonly recyclingRepository: Repository<RecyclingEntity>,

    @InjectRepository(RecyclingTypeEntity)
    private readonly recyclingTypeRepository: Repository<RecyclingTypeEntity>,

  ) { }

  /**
 * 查询回收单列表
 */
  async list({
    page,
    pageSize,
    recyclingNo,
    userName,
    userPhone,
    status,
  }: RecyclingQueryDto): Promise<Pagination<RecyclingEntity>> {
    const queryBuilder = await this.recyclingRepository
      .createQueryBuilder('recycling')
      .where({
        ...(recyclingNo ? { recyclingNo: Like(`%${recyclingNo}%`) } : null),
        ...(userName ? { userName: Like(`%${userName}%`) } : null),
        ...(userPhone ? { userPhone: Like(`%${userPhone}%`) } : null),
        ...(!isEmpty(status) ? { status } : null),
      })

    return paginate<RecyclingEntity>(queryBuilder, {
      page,
      pageSize,
    })
  }

  /**
   * 获取回收单详情
   */
  async info(id: number) {
    const info = await this.recyclingRepository
      .createQueryBuilder('recycling')
      .where({
        id,
      })
      .getOne()

    return { ...info }
  }


  /**
     * 创建回收单
     */
  async creact(dto: RecyclingDto): Promise<string> {
 
       await this.recyclingRepository.save(dto)
  
      return '创建成功'
  }


  /**
     * 更新回收单
     */
  async update(id:number,dto:RecyclingDto): Promise<string> {
  
    await this.recyclingRepository.update(id, dto)

    return '修改成功'
  }

  /**
   * 删除回收单
   */
  async delete(id: number): Promise<string> {
    await this.recyclingRepository.delete(id)
    return '删除成功'
  }

  /**
   * 创建回收类型
   */
  async createRecyclingType(dto: RecyclingTypeEntity): Promise<string> {
    await this.recyclingTypeRepository.save(dto)
    return '创建成功'
  }

  /**
   * 更新回收类型
   */
  async updateRecyclingType(id: number, dto: RecyclingTypeEntity): Promise<string> {
    await this.recyclingTypeRepository.update(id, dto)
    return '修改成功'
  }

  /**
   * 删除回收类型
   */
  async deleteRecyclingType(id: number): Promise<string> {
    await this.recyclingTypeRepository.delete(id)
    return '删除成功'
  }

  /**
   * 获取回收类型列表
   */
  async listRecyclingType(): Promise<RecyclingTypeEntity[]> {
    return await this.recyclingTypeRepository.find()
  }

  /**
   * 获取回收类型详情
   */
  async infoRecyclingType(id: number): Promise<RecyclingTypeEntity> {
    return await this.recyclingTypeRepository.findOne({ where: { id } })
  }
}
