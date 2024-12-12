import { InjectRedis } from '@liaoliaots/nestjs-redis'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import Redis from 'ioredis'
import { isEmpty } from 'lodash'
import { Like, Repository } from 'typeorm'
import { paginate } from '~/helper/paginate'
import { Pagination } from '~/helper/paginate/pagination'


import { MemberDto, MemberQueryDto } from './dto/recycle.dto'
import { MemberEntity } from './recycle.entity'
@Injectable()
export class MaterialService {
  constructor(
    @InjectRedis()
    private readonly redis: Redis,


    @InjectRepository(MemberEntity)
    private readonly memberRepository: Repository<MemberEntity>,

  ) { }

  /**
 * 查询积分记录列表
 */
  async list({
    page,
    pageSize,
    memberName,
    status,
    memberCardNo,
    memberPhone
  }: MemberQueryDto): Promise<Pagination<MemberEntity>> {
    const queryBuilder = await this.memberRepository
      .createQueryBuilder('merber')
      .where({
        ...(memberName ? { memberName: Like(`%${memberName}%`) } : null),
        ...(memberCardNo ? { memberCardNo: Like(`%${memberCardNo}%`) } : null),
        ...(memberPhone ? { memberPhone: Like(`%${memberPhone}%`) } : null),
        ...(!isEmpty(status) ? { status } : null),
      })

    return paginate<MemberEntity>(queryBuilder, {
      page,
      pageSize,
    })
  }

  /**
   * 获取积分记录详情
   */
  async info(id: number) {
    const info = await this.memberRepository
      .createQueryBuilder('merber')
      .where({
        id,
      })
      .getOne()

    return { ...info }
  }


  /**
     * 创建积分记录
     */
  async creact(dto: MemberDto): Promise<string> {
 
       await this.memberRepository.save(dto)
  
      return '创建成功'
  }


  /**
     * 更新积分
     */
  async update(id:number,dto:MemberDto): Promise<string> {
  
    await this.memberRepository.update(id, dto)

    return '修改成功'
  }
}
