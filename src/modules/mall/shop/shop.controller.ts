// src/shop/shop.controller.ts
import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateShopDto } from './create-shop.dto';
import { ShopEntity } from './shop.entity';
import { ShopService } from './shop.service';
import { UpdateShopDto } from './update-shop.dto';

@ApiTags('pos-店铺管理')
@Controller('shop')
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @Post()
  @ApiOperation({ summary: '创建新的店铺' })
  @ApiResponse({ status: 201, description: '成功创建店铺。', type: ShopEntity })
  async create(@Body() createShopDto: CreateShopDto): Promise<ShopEntity> {
    return this.shopService.create(createShopDto);
  }

  @Get()
  @ApiOperation({ summary: '获取所有店铺' })
  @ApiQuery({ name: 'page', required: false, description: '当前页码', type: Number })
  @ApiQuery({ name: 'limit', required: false, description: '每页数量', type: Number })
  @ApiResponse({ status: 200, description: '返回所有店铺。', type: [ShopEntity] })
  async findAll(@Query('page') page = 1, @Query('limit') limit = 10): Promise<{ data: ShopEntity[]; count: number }> {
    const [data, count] = await this.shopService.findAll(page, limit);
    return { data, count };
  }

  @Get(':id')
  @ApiOperation({ summary: '通过ID获取店铺' })
  @ApiResponse({ status: 200, description: '返回指定ID的店铺。', type: ShopEntity })
  @ApiParam({ name: 'id', description: '店铺ID' })
  async findOne(@Param('id') id: number): Promise<ShopEntity> {
    return this.shopService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: '更新店铺' })
  @ApiResponse({ status: 200, description: '成功更新店铺。', type: ShopEntity })
  @ApiParam({ name: 'id', description: '店铺ID' })
  async update(@Param('id') id: number, @Body() updateShopDto: UpdateShopDto): Promise<ShopEntity> {
    return this.shopService.update(id, updateShopDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除店铺' })
  @ApiResponse({ status: 200, description: '成功删除店铺。' })
  @ApiParam({ name: 'id', description: '店铺ID' })
  async remove(@Param('id') id: number): Promise<void> {
    return this.shopService.remove(id);
  }
}
