import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { OrderOrmEntity } from './order.orm-entity';

@Entity('order_items')
export class OrderItemOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productId: string;

  @Column()
  price: number;

  @Column()
  quantity: number;

  @ManyToOne(() => OrderOrmEntity, (order) => order.items)
  order: OrderOrmEntity;
}