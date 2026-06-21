import { DomainEvent } from "shared/domain/domain-event";


interface OrderCreatedPayload {
  orderId: string;
  items: {
    productId: string;
    quantity: number;
  }[];
}

export class OrderCreatedEvent extends DomainEvent<OrderCreatedPayload> {
  readonly eventName = 'order.created';
}