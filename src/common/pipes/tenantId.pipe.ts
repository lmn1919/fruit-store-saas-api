import {
    ArgumentMetadata,
    Inject,
    Injectable,
    PipeTransform,
} from '@nestjs/common'
import { REQUEST } from '@nestjs/core'
  
  import { OperatorDto } from '../dto/operator.dto'
  
  @Injectable()
  export class TenantIdPipe implements PipeTransform {
    constructor(@Inject(REQUEST) private readonly request: any) {}
    transform(value: OperatorDto, metadata: ArgumentMetadata) {
      const user:any = this.request.user as IAuthUser
  
      value.tenantId = user.tenantId
  
      return value
    }
  }
  