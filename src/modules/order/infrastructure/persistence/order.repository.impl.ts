import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../../domain/entities/order.entity';
import { OrderOrmEntity } from '../orm/order.orm-entity';
import { OrderRepository } from '../../domain/repositories/order.repository';
import { OrderMapper } from '../mapper/order.mapper';

@Injectable()
export class OrderRepositoryImpl implements OrderRepository {
  constructor(
    @InjectRepository(OrderOrmEntity)
    private readonly repo: Repository<OrderOrmEntity>,
  ) {}

  async save(order: Order): Promise<void> {
    const entity = OrderMapper.toOrm(order);

    await this.repo.save(this.repo.create(entity));
  }

  async findById(id: string): Promise<Order | null> {
    const entity = await this.repo.findOne({
      where: { id },
      relations: {
        items: true,
      },
    });

    if (!entity) {
      return null;
    }

    return OrderMapper.toDomain(entity);
  }
}
