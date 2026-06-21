import { Order } from '../../domain/entities/order.entity';
import { OrderItem } from '../../domain/entities/order-item.entity';
import { OrderOrmEntity } from '../orm/order.orm-entity';
import { OrderItemOrmEntity } from '../orm/order-item.orm-entity';
import { Email } from 'modules/customer/domain/value-objects/email.vo';
import { OrderStatus } from 'modules/order/domain/value-objects/order-status.vo';
import { Money } from 'modules/order/domain/value-objects/money.vo';

export class OrderMapper {
  static toDomain(entity: OrderOrmEntity): Order {
    return new Order(
        entity.id,
        entity.customerId,
        new Email(entity.customerEmail),
        new Money(entity.total),
        new OrderStatus(entity.status),
        entity.items.map(
            item =>
            new OrderItem(
                item.productId,
                item.price,
                item.quantity,
            ),
        ),
    );
  }

  static toOrm(order: Order): Partial<OrderOrmEntity> {
    return {
        id: order.id,
        customerId: order.customerId,
        customerEmail: order.customerEmail.value,
        total: order.total.amount,
        status: order.status.value,
        items: order.items.map(item => ({
            productId: item.productId,
            price: item.price,
            quantity: item.quantity,
        } as OrderItemOrmEntity)),
    };
  }
}