import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberPrice } from './entities/member-price.entity';
import { PrefrenceAreaProductRelation } from './entities/prefrence-area-product-relation.entity';
import { ProductAttributeValue } from './entities/product-attribute-value.entity';
import { ProductFullReduction } from './entities/product-full-reduction.entity';
import { ProductLadder } from './entities/product-ladder.entity';
import { Product } from './entities/product.entity';
import { SkuStock } from './entities/sku-stock.entity';
import { SubjectProductRelation } from './entities/subject-product-relation.entity';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
      ProductLadder,
      MemberPrice,
      ProductAttributeValue,
      ProductFullReduction,
      SkuStock,
      PrefrenceAreaProductRelation,
      SubjectProductRelation,
    ]),
  ],

  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
