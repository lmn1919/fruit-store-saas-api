import {
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductCategoryEntity } from '../product-category/product-category.entity';
  
  @Entity()
  export class ProductEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;
  
    @Column()
    description: string;
  
    @Column()
    price: number;
  
    @ManyToOne(() => ProductCategoryEntity, (category) => category.products)
    category: ProductCategoryEntity;
  }
  