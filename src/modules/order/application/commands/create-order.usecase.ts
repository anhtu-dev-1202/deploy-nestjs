import { Inject, Injectable } from '@nestjs/common';
import { Order } from '../../domain/entities/order.entity';
import { CreateOrderDto } from '../dto/create-order.dto';
import { OrderRepository } from '../../domain/repositories/order.repository';
import { OrderStatus } from 'modules/order/domain/value-objects/order-status.vo';
import { Email } from 'modules/customer/domain/value-objects/email.vo';
import { Money } from 'modules/order/domain/value-objects/money.vo';
import { ORDER_REPOSITORY } from 'shared/constants/repositories-impl.constants';
import { EventBusService } from 'infrastructure/event-bus/event-bus.service';
import { EVENT_BUS } from 'shared/constants/events.constants';
import { OrderCreatedEvent } from 'modules/order/domain/events/order-created.event';

@Injectable()
export class CreateOrderUseCase {
  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly repo: OrderRepository,
    @Inject(EVENT_BUS)
    private readonly eventBus: EventBusService,
  ) {}

  async execute(dto: CreateOrderDto) {
    const order = new Order(
      crypto.randomUUID(),
      dto.customerId,
      new Email(dto.customerEmail),
      new Money(dto.total),
      OrderStatus.pending(),
      [],
    );

    dto.items.forEach((i) => {
      order.addItem(
        new (class {
          constructor(
            public productId: string,
            public price: number,
            public quantity: number,
          ) {}
        })(i.productId, i.price, i.quantity),
      );
    });

    await this.repo.save(order);

    await this.eventBus.publish(
      new OrderCreatedEvent({
        orderId: order.id,
        items: order.items.map((i) => ({
          productId: i.productId,
          quantity: i.quantity,
        })),
      }),
    );

    return order;
  }
}
