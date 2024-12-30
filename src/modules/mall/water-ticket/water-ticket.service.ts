import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateWaterTicketDto } from './dto/create-water-ticket.dto';
import { WaterTicketEntity } from './water-ticket.entity';

@Injectable()
export class WaterTicketService {
  constructor(
    @InjectRepository(WaterTicketEntity)
    private waterTicketRepository: Repository<WaterTicketEntity>,
  ) {}

  async create(createWaterTicketDto: CreateWaterTicketDto) {
    const waterTicket = this.waterTicketRepository.create({
      ...createWaterTicketDto,
      ticketNo: this.generateTicketNo(),
    });
    return await this.waterTicketRepository.save(waterTicket);
  }

  private generateTicketNo(): string {
    // 生成水票编号的逻辑，可以根据实际需求修改
    return `WT${Date.now()}${Math.floor(Math.random() * 1000)}`;
  }

  async findAll() {
    return await this.waterTicketRepository.find();
  }

  async findOne(id: number) {
    return await this.waterTicketRepository.findOne({ where: { id } });
  }

  async findByUserId(userId: number) {
    return await this.waterTicketRepository.find({ where: { userId } });
  }
} 