import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateProductCategoryDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  icon: string;

  @IsOptional()
  description: string;

  @IsOptional()
  parentId?: number;

  @IsNotEmpty()
  level: number;

  @IsNotEmpty()
  sortOrder: number;

  @IsOptional()
  status?: boolean;
}
