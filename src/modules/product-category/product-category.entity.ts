import {
  Column,
  Entity,
  ManyToOne,
  OneToMany
} from 'typeorm';
import { ProductEntity } from '../product/product.entity';
  
  @Entity()
  export class ProductCategoryEntity {
  
  
    @Column({comment: '分类名称'})
    name: string;
  
    @Column({comment: '分类图标',nullable: true})
    icon: string;
  
    @Column({comment: '描述',nullable: true})
    description: string;
  
    @ManyToOne(() => ProductCategoryEntity, (category) => category.children)
    parent: ProductCategoryEntity;
  
    @OneToMany(() => ProductCategoryEntity, (category) => category.parent)
    children: ProductCategoryEntity[];
  
    @Column({comment: '描述',nullable: true})
    level: number;
  
    @Column({comment: '排序',default: 1})
    sort: number;
  
    @Column({ default: 1, comment: '状态' })
    status: boolean;
  
    @OneToMany(() => ProductEntity, (product) => product.category)
    products: ProductEntity[];
  }
  