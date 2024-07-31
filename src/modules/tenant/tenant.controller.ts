// src/tenant/tenant.controller.ts
import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { TenantService } from './tenant.service';
import { CreateTenantDto } from './create-tenant.dto';
import { UpdateTenantDto } from './update-tenant.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { TenantEntity } from './tenant.entity';

@ApiTags('tenant-租户管理')
@Controller('tenant')
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}

  @Post()
  @ApiOperation({ summary: '创建新的租户' })
  @ApiResponse({ status: 201, description: '成功创建租户。', type: TenantEntity })
  async create(@Body() createTenantDto: CreateTenantDto): Promise<TenantEntity> {
    return this.tenantService.create(createTenantDto);
  }

  @Get()
  @ApiOperation({ summary: '获取所有租户' })
  @ApiResponse({ status: 200, description: '返回所有租户。', type: [TenantEntity] })
  async findAll(): Promise<TenantEntity[]> {
    return this.tenantService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: '通过ID获取租户' })
  @ApiResponse({ status: 200, description: '返回指定ID的租户。', type: TenantEntity })
  @ApiParam({ name: 'id', description: '租户ID' })
  async findOne(@Param('id') id: number): Promise<TenantEntity> {
    return this.tenantService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: '更新租户' })
  @ApiResponse({ status: 200, description: '成功更新租户。', type: TenantEntity })
  @ApiParam({ name: 'id', description: '租户ID' })
  async update(@Param('id') id: number, @Body() updateTenantDto: UpdateTenantDto): Promise<TenantEntity> {
    return this.tenantService.update(id, updateTenantDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除租户' })
  @ApiResponse({ status: 200, description: '成功删除租户。' })
  @ApiParam({ name: 'id', description: '租户ID' })
  async remove(@Param('id') id: number): Promise<void> {
    return this.tenantService.remove(id);
  }
}
