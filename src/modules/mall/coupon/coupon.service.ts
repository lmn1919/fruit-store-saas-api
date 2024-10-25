import { InjectRedis } from '@liaoliaots/nestjs-redis'
import { Injectable } from '@nestjs/common'
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm'
import Redis from 'ioredis'
import { isEmpty } from 'lodash'
import { Between, EntityManager, In, Like, Repository } from 'typeorm'
import { paginate } from '~/helper/paginate'
import { Pagination } from '~/helper/paginate/pagination'
import { CouponDto, CouponQueryDto } from './dto/coupon.dto'
import { CouponProductCategoryRelation } from './entities/coupon-product-category-relation.entity'
import { CouponProductRelation } from './entities/coupon-product-relation.entity'
import { CouponEntity } from './entities/coupon.entity'
@Injectable()
export class CouponService {
  constructor(
    @InjectRedis()
    private readonly redis: Redis,


    @InjectRepository(CouponEntity)
    private readonly couponRepository: Repository<CouponEntity>,

    @InjectEntityManager() private entityManager: EntityManager,
    @InjectRepository(CouponProductCategoryRelation)
    private cpcrRepository: Repository<CouponProductCategoryRelation>,
    @InjectRepository(CouponProductRelation)
    private cprRepository: Repository<CouponProductRelation>,
  ) { }

  /**
 * 查询优惠券列表
 */
  async list({
    page,
    pageSize,
    time,
    status,
    name,

  }: CouponQueryDto): Promise<Pagination<CouponEntity>> {
    const queryBuilder = await this.couponRepository
      .createQueryBuilder('Coupon')
      .where({
        ...(name ? { name: Like(`%${name}%`) } : null),
        // ...(userPhone ? { value: Like(`%${userPhone}%`) } : null),
        ...(time && { createdAt: Between(time[0], time[1]) }),
        ...(!isEmpty(status) ? { status } : null),
      })

    return paginate<CouponEntity>(queryBuilder, {
      page,
      pageSize,
    })
  }

  /**
   * 获取积分记录详情
   */
  async info(id: number) {
    const info = await this.couponRepository
      .createQueryBuilder('Coupon')
      .leftJoinAndSelect('p.productRelationList', 'productRelationList')
      .leftJoinAndSelect(
        'p.productCategoryRelationList',
        'productCategoryRelationList',
      )
      .where('p.id = :id', { id: id })
      .printSql()
      .getOne();

    return { ...info }
  }

  /**
     * 创建优惠券
     */
  async creact(createCouponDto: CouponDto): Promise<string> {
    await this.entityManager.transaction(async (manager) => {
      let res = await manager.save(createCouponDto)

      if (createCouponDto.useType == 1) {
        //分类
        createCouponDto.productCategoryRelationList.forEach((value: any) => {
          value.couponId = res;
        });
        await manager.insert(
          CouponProductCategoryRelation,
          createCouponDto.productCategoryRelationList,
        );
      }
      if (createCouponDto.useType == 2) {
        //商品
        createCouponDto.productRelationList.forEach((value: any) => {
          value.couponId = res;
        });
        await manager.insert(
          CouponProductRelation,
          createCouponDto.productRelationList,
        );
      }

    })
    // await this.couponRepository.save(dto)

    return '创建成功'
  }


  /**
 * 更新优惠券
 */
  async update(
    id: number,
    dto: CouponDto,
  ): Promise<string> {

    await this.entityManager.transaction(async (manager) => {
      await manager.update(CouponEntity, id, dto)
      manager.delete(CouponProductCategoryRelation, { couponId: id });
      manager.delete(CouponProductRelation, { couponId: id });
      if (dto.useType == 1) {
        //分类
        dto.productCategoryRelationList.forEach((value: any) => {
          value.couponId = id;
        });
        await manager.insert(
          CouponProductCategoryRelation,
          dto.productCategoryRelationList,
        );
      }
      if (dto.useType == 2) {
        //商品
        dto.productRelationList.forEach((value: any) => {
          value.couponId = id;
        });
        await manager.insert(
          CouponProductRelation,
          dto.productRelationList,
        );
      }
    })
    return '修改成功'
  }


  async delete(userIds: number[]) {
    const counpon = await this.couponRepository.delete(userIds);
    await this.cpcrRepository.delete({ couponId: In(userIds), })
    await this.cprRepository.delete({ couponId: In(userIds), })



    return { counpon };
  }
}
