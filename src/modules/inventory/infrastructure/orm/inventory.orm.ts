import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('inventory')
export class InventoryOrmEntity {
  @PrimaryColumn()
  productId: string;

  @Column()
  warehouseId: string;

  @Column()
  available: number;

  @Column()
  reserved: number;
}