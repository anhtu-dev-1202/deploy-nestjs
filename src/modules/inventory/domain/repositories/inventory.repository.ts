import { EntityManager } from 'typeorm';
import { Inventory } from '../entities/inventory.entity';

export interface InventoryRepository {
  findByProductId(productId: string): Promise<Inventory | null>;
  save(inventory: Inventory): Promise<void>;
  findByProductIdAcrossWarehouses(productId: string): Promise<Inventory[]>;
  findByProductIdsForUpdate(
    manager: EntityManager,
    productIds: string[],
  ): Promise<Inventory[]>;
  saveMany(manager: EntityManager, invs: Inventory[]): Promise<void>;
}
