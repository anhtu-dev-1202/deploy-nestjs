import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { OrderItemOrmEntity } from './order-item.orm-entity';
import { ORDER_STATUS } from 'modules/order/domain/value-objects/order-status.vo';

@Entity('orders')
export class OrderOrmEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  customerId: string;

  @Column()
  customerEmail: string;

  @Column()
  total: number;

  @Column()
  status: ORDER_STATUS;

  @OneToMany(() => OrderItemOrmEntity, (item) => item.order, {
    cascade: true,
  })
  items: OrderItemOrmEntity[];
}