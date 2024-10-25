import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isNil } from 'lodash';
import { Like, Repository } from 'typeorm';
import { paginate } from '~/helper/paginate';
import { Pagination } from '~/helper/paginate/pagination';
import { CouponEntity } from '~/modules/mall/coupon/entities/coupon.entity';
import { UserEntity } from '~/modules/user/user.entity';
import { CouponHistoryCreact, CouponHistorySearchDto, CouponHistoryUpdateDto } from './dto/coupon-history.dto';
import { CouponHistory } from './entities/coupon-history.entity';
@Injectable()
export class CouponHistoryService {
  constructor(
    @InjectRepository(CouponHistory)
    private cphRepository: Repository<CouponHistory>,

    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,

    @InjectRepository(CouponEntity)
    private readonly couponRepository: Repository<CouponEntity>,
  ) { }




  async list({
    page,
    pageSize,
    useStatus, couponId, orderSn,
    couponName, getType, memberId, memberUserPhone,
    orderId
  }: CouponHistorySearchDto): Promise<Pagination<CouponHistory>> {
    const queryBuilder = this.cphRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.dept', 'dept')
      .leftJoinAndSelect('user.roles', 'role')
      // .where('user.id NOT IN (:...ids)', { ids: [rootUserId, uid] })
      .where({
        ...(couponName ? { couponName: Like(`%${couponName}%`) } : null),
        ...(memberUserPhone ? { memberUserPhone: Like(`%${memberUserPhone}%`) } : null),
        ...(!isNil(memberId) ? { memberId } : null),
        ...(!isNil(useStatus) ? { useStatus } : null),
        ...(!isNil(couponId) ? { couponId } : null),
        ...(!isNil(orderSn) ? { orderSn } : null),
        ...(!isNil(getType) ? { getType } : null),
        ...(!isNil(orderId) ? { orderId } : null),

      })



    return paginate<CouponHistory>(queryBuilder, {
      page,
      pageSize,
    })
  }


  /**
 * 注册
 */
  async create({ memberId, couponId }: CouponHistoryCreact): Promise<void> {
    let userData = await this.userRepository.findOneBy({ id: memberId })
    let couponData = await this.couponRepository.findOneBy({ id: couponId })
    await this.cphRepository.save({ memberId, couponId })

  }

  async update(id: number, { useTime }: CouponHistoryUpdateDto): Promise<string> {
    await this.cphRepository.save({
      id,
      useTime,
    })

    return '修改成功'
  }
}
