import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WaterTicketController } from './water-ticket.controller';
import { WaterTicketEntity } from './water-ticket.entity';
import { WaterTicketService } from './water-ticket.service';

@Module({
  imports: [TypeOrmModule.forFeature([WaterTicketEntity])],
  controllers: [WaterTicketController],
  providers: [WaterTicketService],
  exports: [WaterTicketService],
})
export class WaterTicketModule {} 