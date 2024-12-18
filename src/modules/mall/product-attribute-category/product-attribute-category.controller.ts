import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Request
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BasePageDto } from '~/common/BasePageDto';
import { CommonResult } from '~/common/CommonResult';
import { ProductAttributeCategoryService } from './product-attribute-category.service';

@ApiTags('pos-商品属性分类管理')
@Controller('productAttribute/category/')
export class ProductAttributeCategoryController {
  constructor(
    private readonly productAttributeCategoryService: ProductAttributeCategoryService,
  ) {}

  @ApiOperation({
    summary: '获取所有商品属性分类及其下属性',
  })
  @Post('create')
  create(@Body('name') name: string) {
    console.log('name', name);
    if (!name) {
      return CommonResult.failedCommon('名称不能为空', 500);
    }
    return this.productAttributeCategoryService.create(name);
  }

  @Post('/update/:id')
  update(@Param('id') id: number, @Body('name') name: string) {
    console.log('name', name);

    return this.productAttributeCategoryService.updateAttribute(id, name);
  }

  @Get('/delete/:id')
  delete(@Param('id') id: number) {
    return this.productAttributeCategoryService.deleteAttribute(id);
  }

  @ApiOperation({
    summary: '获取所有商品属性分类及其下属性',
  })
  @Get('list/withAttr')
  async findAttri(@Request() req) {
    const childList = await this.productAttributeCategoryService.getAttrilist();

    return childList;
  }

  @ApiOperation({
    summary: '分页获取所有商品属性分类',
  })
  @Get('list')
  async findAll(@Query() query: BasePageDto, @Request() req) {
    const childList = await this.productAttributeCategoryService.getPageList(
      query,
    );
    const result = CommonResult.pageData(
      childList,
      query.pageSize,
      query.pageNum,
    );
    return result;
  }
}
