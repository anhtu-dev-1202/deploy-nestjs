import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { OrderCreatedPayload } from '../dto/order-create-payload.dto';
import { ReserveStockUseCase } from '../commands/reserve-stock.usecase';
import { OrderCreatedEvent } from 'modules/order/domain/events/order-created.event';

@Injectable()
export class OrderCreatedListener {
  private readonly logger = new Logger('Inventory');

  constructor(
    private readonly reserveStock: ReserveStockUseCase,
  ) {}

  @OnEvent('order.created')
  async handle(event: OrderCreatedEvent) {
    this.logger.log('📦 Order created → start allocation');

    const results = [];

    for (const item of event.payload.items) {
      try {
        const allocation = await this.reserveStock.execute(
          item.productId,
          item.quantity,
        );

        results.push({
          productId: item.productId,
          success: true,
          allocation,
        });

        this.logger.log(
          `🔒 Reserved ${item.quantity} for ${item.productId}`,
        );
      } catch (e: any) {
        this.logger.error(
          `❌ Failed reserve ${item.productId}: ${e.message}`,
        );

        results.push({
          productId: item.productId,
          success: false,
        });
      }
    }

    this.logger.log('✅ Allocation done:', results);

    return results;
  }
}