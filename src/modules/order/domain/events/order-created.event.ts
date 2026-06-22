import { DomainEvent } from 'shared/domain/domain-event';

export interface OrderCreatedPayload {
  orderId: string;
  items: {
    productId: string;
    quantity: number;
  }[];
}

export class OrderCreatedEvent extends DomainEvent<OrderCreatedPayload> {
  readonly name = 'order.created';
}
