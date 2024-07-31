import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductCategoryDto } from './dto/create-product-category.dto';
import { ProductCategoryEntity } from './product-category.entity';

@Injectable()
export class ProductCategoryService {
  constructor(
    @InjectRepository(ProductCategoryEntity)
    private categoryRepository: Repository<ProductCategoryEntity>,
  ) {}

  create(createProductCategoryDto: CreateProductCategoryDto): Promise<ProductCategoryEntity> {
    const category = this.categoryRepository.create(createProductCategoryDto);
    if (createProductCategoryDto.parentId) {
      category.parent = { id: createProductCategoryDto.parentId } as ProductCategoryEntity;
    }
    return this.categoryRepository.save(category);
  }

  findAll(): Promise<ProductCategoryEntity[]> {
    return this.categoryRepository.find({ relations: ['parent', 'children'] });
  }

  findOne(id: any): Promise<ProductCategoryEntity> {
    return this.categoryRepository.findOne(id);
  }

  async update(id: any, updateProductCategoryDto: CreateProductCategoryDto): Promise<ProductCategoryEntity> {
    const category = await this.categoryRepository.findOne(id);
    Object.assign(category, updateProductCategoryDto);
    if (updateProductCategoryDto.parentId) {
      category.parent = { id: updateProductCategoryDto.parentId } as ProductCategoryEntity;
    }
    return this.categoryRepository.save(category);
  }

  async remove(id: number): Promise<void> {
    await this.categoryRepository.delete(id);
  }
}
