import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { ReserveStockUseCase } from '../commands/reserve-stock.usecase';
import { OrderCreatedEvent } from 'modules/order/domain/events/order-created.event';

@Injectable()
export class OrderCreatedListener {
  private readonly logger = new Logger('Inventory');

  constructor(private readonly reserveStock: ReserveStockUseCase) {}

  @OnEvent('order.created')
  async handle(event: OrderCreatedEvent) {
    this.logger.log('📦 Order created → start allocation');

    const result = await this.reserveStock.batchExecute(event.payload.items);

    this.logger.log('✅ Allocation done:', result);

    return result;
  }
}
