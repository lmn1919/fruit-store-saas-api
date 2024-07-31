import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTenantDto {
  @IsString()
  @ApiProperty({ description: '租户名' })
  name: string;

  @IsString()
  @ApiProperty({ description: '租户类型' })
  type: string;
}

