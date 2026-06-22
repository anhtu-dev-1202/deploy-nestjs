import { OrderItem } from './order-item.entity';
import { OrderStatus } from '../value-objects/order-status.vo';
import { Money } from '../value-objects/money.vo';
import { Email } from 'modules/customer/domain/value-objects/email.vo';
import { AggregateRoot } from 'shared/domain/aggregate-root';
import { Guard } from 'shared/utils/guard';

export class Order extends AggregateRoot {
  constructor(
    public readonly id: string,
    public customerId: string,
    public customerEmail: Email,
    public total: Money,
    public status: OrderStatus,
    public items: OrderItem[],
  ) {
    super(id, new Date(), new Date());

    Guard.againstNullOrUndefined(customerId, 'CustomerId is required');
    Guard.againstNullOrUndefined(id, 'Order id required');
  }

  static create(input: Order) {
    const order = new Order(
      crypto.randomUUID(),
      input.customerId,
      input.customerEmail,
      input.total,
      OrderStatus.pending(),
      input.items,
    );

    order.addEvent({
      name: 'order.created',
      occurredAt: new Date(),
      payload: {
        orderId: order.id,
        items: order.items,
      },
    });

    return order;
  }

  addItem(item: OrderItem) {
    if (this.status !== OrderStatus.pending()) {
      throw new Error('Cannot modify confirmed order');
    }

    this.items.push(item);
  }

  pay() {
    this.status = OrderStatus.paid();

    this.addEvent({
      name: 'order.paid',
      occurredAt: new Date(),
      payload: {
        orderId: this.id,
      },
    });
  }

  getItems() {
    return this.items;
  }

  getTotal() {
    return this.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  }
}
