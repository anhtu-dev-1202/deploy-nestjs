import { ValueObject } from 'shared/domain/value-object';

export enum ORDER_STATUS {
  DRAFT = 'DRAFT',
  PENDING = 'PENDING',
  CANCELLED = 'CANCELLED',
  PAID = 'PAID',
  SHIPPED = 'SHIPPED',
}

interface OrderStatusProps {
  value: ORDER_STATUS;
}

export class OrderStatus extends ValueObject<OrderStatusProps> {
  constructor(value: ORDER_STATUS) {
    super({ value });
  }

  static pending() {
    return new OrderStatus(ORDER_STATUS.PENDING);
  }

  static cancelled() {
    return new OrderStatus(ORDER_STATUS.CANCELLED);
  }

  static paid() {
    return new OrderStatus(ORDER_STATUS.PAID);
  }

  static shipped() {
    return new OrderStatus(ORDER_STATUS.SHIPPED);
  }

  get value() {
    return this.value;
  }
}
