import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne
} from 'typeorm';
import { CompleteEntity } from '~/common/entity/common.entity';
import { ProductCategory } from '~/modules/mall/product-category/entities/product-category.entity';
import { MemberPrice } from './member-price.entity';
// import { PrefrenceAreaProductRelation } from './prefrence-area-product-relation.entity';
import { ProductAttributeValue } from './product-attribute-value.entity';
import { ProductFullReduction } from './product-full-reduction.entity';
import { ProductLadder } from './product-ladder.entity';
import { SkuStock } from './sku-stock.entity';
import { SubjectProductRelation } from './subject-product-relation.entity';
@Entity('pos_product')
export class Product extends CompleteEntity {

  @ApiProperty({ description: '品牌 id' })
  @Column({ type: 'bigint', name: 'brand_id', nullable: true })
  brandId: number;

  @ApiProperty({ description: '类别 id' })
  @Column({ type: 'bigint', name: 'product_category_id', nullable: true })
  productCategoryId: number;

  @ApiProperty({ description: '模板 id' })
  @Column({ type: 'bigint', name: 'feight_template_id', nullable: true })
  feightTemplateId: number;

  @ApiProperty({ description: 'sku id' })
  @Column({ type: 'bigint', name: 'product_attribute_category_id', nullable: true })
  productAttributeCategoryId: number;

  @ApiProperty({ description: '名称' })
  @Column({ length: 200 })
  name: string;

  @ApiProperty({ description: '图片' })
  @Column({ length: 255 })
  pic: string;

  @ApiProperty({ description: '货号' })
  @Column({ length: 64, name: 'product_sn' })
  productSn: string;

  @ApiProperty({ description: '上架状态：0->下架；1->上架' })
  @Column({ type: 'int', name: 'publish_status', default: 1 })
  publishStatus: number;

  @ApiProperty({ description: '新品状态:0->不是新品；1->新品' })
  @Column({ type: 'int', name: 'new_status', nullable: true })
  newStatus: number;

  @ApiProperty({ description: '推荐状态；0->不推荐；1->推荐' })
  @Column({ type: 'int', name: 'recommand_status', nullable: true })
  recommandStatus: number;

  @ApiProperty({ description: '审核状态：0-草稿；1->未审核；2->上架中；3->已下架' })
  @Column({ type: 'int', name: 'status', default: 0 })
  status: number;

  @ApiProperty({ description: '销量' })
  @Column({ type: 'int', name: 'status', default: 0 })
  sale: number;

  @ApiProperty({ description: '排序' })
  @Column({nullable: true,default: 1 })
  sort: number;

  @ApiProperty({ description: '价格/单价' })
  @Column({ type: 'decimal' })
  price: number;

  @ApiProperty({ description: '促销价格' })
  @Column({ type: 'decimal', name: 'promotion_price',nullable: true })
  promotionPrice: number;

  @ApiProperty({ description: '市场价/划线价' })
  @Column({ type: 'decimal', name: 'original_price',nullable: true })
  originalPrice: number;

  @ApiProperty({ description: '库存' })
  @Column({ type: 'int',default:0 })
  stock: number;

  @ApiProperty({ description: '库存预警值' })
  @Column({ type: 'int', name: 'low_stock',nullable: true })
  lowStock: number;

  @ApiProperty({ description: '单位' })
  @Column({ length: 16 })
  unit: string;



  @ApiProperty({ description: '商品重量，默认为克' })
  @Column({ type: 'decimal',nullable: true })
  weight: number;



  @ApiProperty({ description: '赠送的积分' })
  @Column({ type: 'int', name: 'gift_point',nullable: true })
  giftPoint: number;

  @ApiProperty({ description: '积分比例' })
  @Column({ type: 'int', name: 'point_patio',nullable: true })
  pointPatio: number;

  @ApiProperty({ description: '限制使用的积分数' })
  @Column({ type: 'int', name: 'use_point_limit',nullable: true })
  usePointLimit: number;

  @ApiProperty({ description: '商品描述' })
  @Column({ type: 'text',nullable: true })
  description: string;

  @ApiProperty({ description: '是否为预告商品：0->不是；1->是' })
  @Column({ type: 'int', name: 'preview_status',nullable: true })
  previewStatus: number;

  @ApiProperty({
    description: '以逗号分割的产品服务：1->无忧退货；2->快速退款；3->免费包邮',
  })
  @Column({ length: 64, name: 'service_ids',nullable: true })
  serviceIds: string;

  @ApiProperty({ description: 'keywords' })
  @Column({ length: 255,nullable: true })
  keywords: string;

  @ApiProperty({ description: '备注' })
  @Column({ length: 255,nullable: true })
  note: string;



  @ApiProperty({ description: '产品详情网页内容' })
  @Column({ type: 'text', name: 'detail_html',nullable: true })
  detailHtml: string;


  @ApiProperty({ description: '促销开始时间' })
  @Column({ type: 'datetime', name: 'promotion_start_time',nullable: true })
  promotionStartTime: Date;

  @ApiProperty({ description: '促销结束时间' })
  @Column({ type: 'datetime', name: 'promotion_end_time',nullable: true })
  promotionEndTime: Date;

  @ApiProperty({ description: '活动限购数量' })
  @Column({ type: 'int', name: 'promotion_per_limit',nullable: true })
  promotionPerLimit: number;

  @ApiProperty({
    description:
      '促销类型：0->没有促销使用原价;1->使用促销价；2->使用会员价；3->使用阶梯价格；4->使用满减价格；5->限时购',
  })
  @Column({ type: 'int', name: 'promotion_type',nullable: true })
  promotionType: number;

  @ApiProperty({ description: '品牌名称' })
  @Column({ length: 255, name: 'brand_name',nullable: true })
  brandName: string;

  @ApiProperty({ description: '商品分类名称' })
  @Column({ length: 255, name: 'product_category_name' })
  productCategoryName: string;

  @ApiProperty({ description: '秤码' })
  @Column({ length: 255, name: 'scale_num',nullable: true })
  scaleNum: string;

  @OneToOne(
    (type) => ProductCategory,
    (productCategory) => productCategory.product,
  )
  @JoinColumn({ name: 'product_category_id' })
  productCategory: ProductCategory;

  @OneToMany((type) => ProductLadder, (productLadder) => productLadder.product)
  productLadderList: ProductLadder[];

  @OneToMany(
    (type) => ProductFullReduction,
    (productFullReduction) => productFullReduction.product,
  )
  productFullReductionList: ProductFullReduction[];

  @OneToMany((type) => MemberPrice, (memberPrice) => memberPrice.product)
  memberPriceList: MemberPrice[];

  @OneToMany((type) => SkuStock, (skuStock) => skuStock.product)
  skuStockList: SkuStock[];

  @OneToMany(
    (type) => ProductAttributeValue,
    (attributeValue) => attributeValue.product,
  )
  productAttributeValueList: ProductAttributeValue[];

  // @OneToMany(
  //   (type) => PrefrenceAreaProductRelation,
  //   (prefrenceAreaProductRelation) => prefrenceAreaProductRelation.product,
  // )
  // prefrenceAreaProductRelationList: PrefrenceAreaProductRelation[];

  @OneToMany(
    (type) => SubjectProductRelation,
    (subjectProductRelation) => subjectProductRelation.product,
  )
  subjectProductRelationList: SubjectProductRelation[];
}
