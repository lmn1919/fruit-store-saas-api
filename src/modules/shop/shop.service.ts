// src/shop/shop.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShopEntity } from './shop.entity';
import { CreateShopDto } from './create-shop.dto';
import { UpdateShopDto } from './update-shop.dto';

@Injectable()
export class ShopService {
  constructor(
    @InjectRepository(ShopEntity)
    private readonly shopRepository: Repository<ShopEntity>,
  ) {}

  async create(createShopDto: CreateShopDto): Promise<ShopEntity> {
    const shop = this.shopRepository.create(createShopDto);
    return this.shopRepository.save(shop);
  }

  async findAll(page: number, limit: number): Promise<[ShopEntity[], number]> {
    return this.shopRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async findOne(id: any): Promise<ShopEntity> {
    return this.shopRepository.findOne(id);
  }

  async update(id: number, updateShopDto: UpdateShopDto): Promise<ShopEntity> {
    await this.shopRepository.update(id, updateShopDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.shopRepository.softDelete(id);
  }
}
