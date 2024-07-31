// src/appointment-order/dto/update-appointment-order.dto.ts
import { PartialType } from '@nestjs/swagger';
import { CreateAppointmentOrderDto } from './create-appointment-order.dto';

export class UpdateAppointmentOrderDto extends PartialType(CreateAppointmentOrderDto) {}