import { Inject, Injectable } from '@nestjs/common';
import { OrderRepository } from '../../domain/repositories/order.repository';
import { OrderStatus } from 'modules/order/domain/value-objects/order-status.vo';
import { ORDER_REPOSITORY } from 'shared/constants/repositories-impl.constants';

@Injectable()
export class CancelOrderUseCase {
  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly repo: OrderRepository,
  ) {}

  async execute(id: string) {
    const order = await this.repo.findById(id);

    if (!order) {
      throw new Error('Order not found');
    }

    order.status = OrderStatus.cancelled();

    await this.repo.save(order);

    return order;
  }
}
