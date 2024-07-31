// src/tenant/tenant.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TenantEntity } from './tenant.entity';
import { CreateTenantDto } from './create-tenant.dto';
import { UpdateTenantDto } from './update-tenant.dto';

@Injectable()
export class TenantService {
  constructor(
    @InjectRepository(TenantEntity)
    private readonly tenantRepository: Repository<TenantEntity>,
  ) {}

  async create(createTenantDto: CreateTenantDto): Promise<TenantEntity> {
    const tenant = this.tenantRepository.create(createTenantDto);
    return this.tenantRepository.save(tenant);
  }

  async findAll(): Promise<TenantEntity[]> {
    return this.tenantRepository.find();
  }

  async findOne(id: any): Promise<TenantEntity> {
    return this.tenantRepository.findOne(id);
  }

  async update(id: number, updateTenantDto: UpdateTenantDto): Promise<TenantEntity> {
    await this.tenantRepository.update(id, updateTenantDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.tenantRepository.softDelete(id);
  }
}
