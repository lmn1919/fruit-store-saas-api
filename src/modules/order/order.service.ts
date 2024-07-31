// src/appointment-order/appointment-order.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAppointmentOrderDto } from './dto/create-appointment-order.dto';
import { UpdateAppointmentOrderDto } from './dto/update-appointment-order.dto';
import { AppointmentOrder } from './order.entity';

@Injectable()
export class AppointmentOrderService {
  constructor(
    @InjectRepository(AppointmentOrder)
    private readonly appointmentOrderRepository: Repository<AppointmentOrder>,
  ) {}

  async create(createAppointmentOrderDto: CreateAppointmentOrderDto): Promise<AppointmentOrder> {
    const appointmentOrder = this.appointmentOrderRepository.create(createAppointmentOrderDto);
    return this.appointmentOrderRepository.save(appointmentOrder);
  }

  async findAll(): Promise<AppointmentOrder[]> {
    return this.appointmentOrderRepository.find();
  }

  async findOne(id: any): Promise<AppointmentOrder> {
    return this.appointmentOrderRepository.findOne(id);
  }

  async update(id: number, updateAppointmentOrderDto: UpdateAppointmentOrderDto): Promise<AppointmentOrder> {
    await this.appointmentOrderRepository.update(id, updateAppointmentOrderDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.appointmentOrderRepository.softDelete(id);
  }
}
