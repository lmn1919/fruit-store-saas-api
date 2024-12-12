import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { BasePageDto } from '~/common/BasePageDto';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,


  ) {}

  /**
   * 查询 产品详情
   * @param dto
   * @returns
   */
  async getProductById(productId: number) {
    try {
      // 查询产品基本信息
      const product = await this.productRepository.findOne({
        where: { id: productId },
        relations: [
          'productCategory',
          'skuStockList',
          'productLadderList',
          'memberPriceList',
          'productAttributeValueList',
          'subjectProductRelationList',
          'prefrenceAreaProductRelationList',
          'productFullReductionList'
        ]
      });

      if (!product) {
        throw new HttpException('产品不存在', HttpStatus.BAD_REQUEST);
      }

      return product;
      
    } catch (error) {
      throw new HttpException(error.message || '获取产品详情失败', HttpStatus.BAD_REQUEST);
    }
  }
  /**
   * 新建 产品
   * @param dto
   * @returns
   */
  async createProduct(productInfo: CreateProductDto) {
    try {
      const prInfo = { ...productInfo };
      delete prInfo.verifyStatus;
      delete prInfo.skuStockList;
      delete prInfo.memberPriceList;
      delete prInfo.productLadderList;
      delete prInfo.productAttributeValueList;
      delete prInfo.prefrenceAreaProductRelationList;
      delete prInfo.productFullReductionList;
      delete prInfo.subjectProductRelationList;

      // 创建产品基本信息
      const product = await this.productRepository.create(prInfo);
      const savedProduct = await this.productRepository.save(product);
      const productId = savedProduct.id;

      // 保存阶梯价格
      if (productInfo.productLadderList?.length > 0) {
        const ladderList = productInfo.productLadderList.map(ladder => ({
          ...ladder,
          productId
        }));
        await this.productRepository.save(ladderList);
      }

      // 保存SKU信息
      if (productInfo.skuStockList?.length > 0) {
        const skuList = productInfo.skuStockList.map(sku => ({
          ...sku,
          productId
        }));
        await this.productRepository.save(skuList);
      }

      // 保存会员价格
      if (productInfo.memberPriceList?.length > 0) {
        const memberPrices = productInfo.memberPriceList.map(price => ({
          ...price,
          productId
        }));
        await this.productRepository.save(memberPrices);
      }

      // 保存商品属性值
      if (productInfo.productAttributeValueList?.length > 0) {
        const attributeValues = productInfo.productAttributeValueList.map(attr => ({
          ...attr,
          productId
        }));
        await this.productRepository.save(attributeValues);
      }

      return savedProduct;

    } catch (error) {
      throw new Error(`创建产品失败: ${error.message}`);
    }
  
  }
  /**
   * 更新 产品
   * @param dto
   * @returns
   */
  async updateProductById(
    productId: number,
    productInfo: CreateProductDto,
  ) {
    try {
      // 查找现有产品
      const existingProduct = await this.productRepository.findOneBy({ id: productId });
      if (!existingProduct) {
        throw new Error('产品不存在');
      }

      // 更新基本信息
      Object.assign(existingProduct, productInfo);
      const savedProduct = await this.productRepository.save(existingProduct);

      // 更新商品阶梯价格
      if (productInfo.productLadderList?.length > 0) {
        // 先删除原有数据
        await this.productRepository.delete({ id: productId });
        
        const ladderList = productInfo.productLadderList.map(ladder => ({
          ...ladder,
          productId
        }));
        await this.productRepository.save(ladderList);
      }

      // 更新SKU库存信息
      if (productInfo.skuStockList?.length > 0) {
        await this.productRepository.delete({id: productId });
        
        const skuList = productInfo.skuStockList.map(sku => ({
          ...sku,
          productId
        }));
        await this.productRepository.save(skuList);
      }

      // 更新会员价格
      if (productInfo.memberPriceList?.length > 0) {
        await this.productRepository.delete({id: productId });
        
        const memberPrices = productInfo.memberPriceList.map(price => ({
          ...price,
          productId
        }));
        await this.productRepository.save(memberPrices);
      }

      // 更新商品属性值
      if (productInfo.productAttributeValueList?.length > 0) {
        await this.productRepository.delete({id: productId });
        
        const attributeValues = productInfo.productAttributeValueList.map(attr => ({
          ...attr,
          productId
        }));
        await this.productRepository.save(attributeValues);
      }

      return savedProduct;

    } catch (error) {
      throw new Error(`更新产品失败: ${error.message}`);
    }
  }

  /**
   * 查询 产品列表
   * @param dto
   * @returns
   */
  async getProductList(dto: BasePageDto) {
    const { keyword, pageSize, pageNum } = dto;
    const queryFilter: any = {};
    queryFilter.deleteStatus = 0;
    if (keyword) {
      // 模糊查询 username
      queryFilter.name = Like(`%${keyword}%`);
    }
    const res = await this.productRepository.findAndCount({
      // 查询条件
      where: queryFilter,
      // 排序
      order: { sort: 'DESC' },
      // offset，分页的偏移量
      skip: (pageNum - 1) * pageSize,
      // 每页条数
      take: pageSize,
      // 是否缓存
      cache: true,
    });
    return res;
  }

  /**
   * 查询 产品列表 模糊
   * @param dto
   * @returns
   */
  async getSimpleProductList(keyword: string) {
    const queryFilter: any = {};
    queryFilter.deleteStatus = 0;
    if (keyword) {
      // 模糊查询 username
      queryFilter.name = Like(`%${keyword}%`);
    }
    const res = await this.productRepository.find({
      // 查询条件
      where: queryFilter,
      // 是否缓存
      cache: true,
    });
    return res;
  }

  /**
   * 批量上架
   * @param
   * @param
   * @returns
   */
  async batchUpdatePublishStatus(ids: string, publishStatus: number) {
    const idst = ids.split(',');
    const existComment = await this.productRepository.findByIds(idst);
    console.log(existComment);
    const updatedComment = [];
    existComment.map((el) => {
      updatedComment.push({ ...el, publishStatus: publishStatus });
    });
    const result = await this.productRepository.save(updatedComment);
    return result;
  }

  /**
   * 批量推荐商品
   * @param
   * @param
   * @returns
   */
  async batchUpdateRecommendStatus(ids: string, recommendStatus: number) {
    const idst = ids.split(',');
    const existComment = await this.productRepository.findByIds(idst);
    console.log(existComment);
    const updatedComment = [];
    existComment.map((el) => {
      updatedComment.push({ ...el, recommendStatus: recommendStatus });
    });
    const result = await this.productRepository.save(updatedComment);
    return result;
  }

  /**
   * 批量设为新品
   * @param
   * @param
   * @returns
   */
  async batchUpdateNewStatus(ids: string, newStatus: number) {
    const idst = ids.split(',');
    const existComment = await this.productRepository.findByIds(idst);
    console.log(existComment);
    const updatedComment = [];
    existComment.map((el) => {
      updatedComment.push({ ...el, newStatus: newStatus });
    });
    const result = await this.productRepository.save(updatedComment);
    return result;
  }

  /**
   * 批量修改删除状态
   * @param
   * @param
   * @returns
   */
  async batchUpdateDeleteStatus(ids: string, deleteStatus: number) {
    const idst = ids.split(',');
    const existComment = await this.productRepository.findByIds(idst);
    console.log(existComment);
    const updatedComment = [];
    existComment.map((el) => {
      updatedComment.push({ ...el, deleteStatus: deleteStatus });
    });
    const result = await this.productRepository.save(updatedComment);
    return result;
  }
}
