import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
  Request,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BasePageDto } from '~/common/BasePageDto';
import { CommonResult } from '~/common/CommonResult';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from './product.service';

@ApiTags('pos-产品')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @ApiOperation({
    summary: '创建商品',
  })
  @Post('create')
  // @Transaction()
  async create(
    @Body() updateDto: CreateProductDto,
    // @TransactionManager() maneger: EntityManager,
  ) {
    try {
      const sql = await this.productService.createProduct(updateDto);
      return sql;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @ApiOperation({
    summary: '获取产品列表',
  })
  @Get('list')
  async getProductPageList(@Query() query: BasePageDto, @Request() req) {
    console.log(req.user, query);
    const pageList = await this.productService.getProductList(query);
    const result = CommonResult.pageData(
      pageList,
      query.pageSize,
      query.pageNum,
    );

    return result;
  }

  @ApiOperation({
    summary: '根据商品名称或货号模糊查询',
  })
  @Get('simpleList')
  async getList(@Query('keyword') keyword: string, @Request() req) {
    console.log('simp参数', req.user, keyword);
    const pageList = await this.productService.getSimpleProductList(keyword);
    return pageList;
  }

  @ApiOperation({
    summary: '根据商品id获取商品编辑信息',
  })
  @Get('/updateInfo/:id')
  async getProductDetail(@Param('id') id: number) {
    const sql = await this.productService.getProductById(id);
    const result: any = { ...sql };
    result.cateParentId = result.productCategory.parentId;

    return result
  }

  @ApiOperation({
    summary: '批量上下架商品',
  })
  @Post('/update/publishStatus')
  async updateBatchPublishStatus(
    @Query('ids') ids: string,
    @Query('publishStatus') publishStatus: number,
  ) {
    console.log('参数值', ids, publishStatus);
    const result = await this.productService.batchUpdatePublishStatus(
      ids,
      publishStatus,
    );
    return result;
  }

  @ApiOperation({
    summary: '批量推荐商品',
  })
  @Post('/update/recommendStatus')
  async updateBatchRecommendStatus(
    @Query('ids') ids: string,
    @Query('recommendStatus') recommendStatus: number,
  ) {
    console.log('参数值', ids, recommendStatus);
    const result = await this.productService.batchUpdateRecommendStatus(
      ids,
      recommendStatus,
    );
    return result;
  }

  @ApiOperation({
    summary: '批量设为新品',
  })
  @Post('/update/newStatus')
  async updateBatchNewStatus(
    @Query('ids') ids: string,
    @Query('newStatus') newStatus: number,
  ) {
    console.log('参数值', ids, newStatus);
    const result = await this.productService.batchUpdateNewStatus(
      ids,
      newStatus,
    );
    return result;
  }

  @ApiOperation({
    summary: '批量修改删除状态',
  })
  @Post('/update/deleteStatus')
  async updateBatchDeleteStatus(
    @Query('ids') ids: string,
    @Query('deleteStatus') deleteStatus: number,
  ) {
    console.log('参数值', ids, deleteStatus);
    const result = await this.productService.batchUpdateDeleteStatus(
      ids,
      deleteStatus,
    );
    return result;
  }


  @ApiOperation({
    summary: '更新商品',
  })
  @Post('/update/:id')
  // @Transaction()
  async updateProduct(
    @Param('id') id: number,
    @Body() updateDto: CreateProductDto,
    // @TransactionManager() maneger: EntityManager,
  ) {
    try {
      const sql = await this.productService.updateProductById(
        id,
        updateDto,
  
      );
      return sql;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
