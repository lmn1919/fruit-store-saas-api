import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateProductCategoryDto } from './dto/create-product-category.dto';
import { ProductCategoryEntity } from './product-category.entity';
import { ProductCategoryService } from './product.service';

@ApiTags('产品分类')
@Controller('product-categories')
export class ProductCategoryController {
  constructor(private readonly productCategoryService: ProductCategoryService) {}

  @Post()
  @ApiOperation({ summary: '创建产品分类' })
  @ApiResponse({ status: 201, description: '分类创建成功。', type: ProductCategoryEntity })
  @ApiResponse({ status: 400, description: '无效的输入。' })
  create(@Body() createProductCategoryDto: CreateProductCategoryDto) {
    return this.productCategoryService.create(createProductCategoryDto);
  }

  @Get()
  @ApiOperation({ summary: '获取所有产品分类' })
  @ApiResponse({ status: 200, description: '分类列表', type: [ProductCategoryEntity] })
  findAll() {
    return this.productCategoryService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: '根据ID获取产品分类' })
  @ApiResponse({ status: 200, description: '分类详情', type: ProductCategoryEntity })
  @ApiResponse({ status: 404, description: '分类未找到' })
  findOne(@Param('id') id: string) {
    return this.productCategoryService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: '更新产品分类' })
  @ApiResponse({ status: 200, description: '分类更新成功。', type: ProductCategoryEntity })
  @ApiResponse({ status: 404, description: '分类未找到' })
  update(@Param('id') id: string, @Body() updateProductCategoryDto: CreateProductCategoryDto) {
    return this.productCategoryService.update(+id, updateProductCategoryDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除产品分类' })
  @ApiResponse({ status: 200, description: '分类删除成功。' })
  @ApiResponse({ status: 404, description: '分类未找到' })
  remove(@Param('id') id: string) {
    return this.productCategoryService.remove(+id);
  }
}
