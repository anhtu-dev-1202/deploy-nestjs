import { Quantity } from 'modules/inventory/domain/value-objects/quantity.vo';
import { InventoryOrmEntity } from '../orm/inventory.orm';
import { Inventory } from 'modules/inventory/domain/entities/inventory.entity';

export class InventoryMapper {
  static toDomain(entity: InventoryOrmEntity): Inventory {
    return new Inventory(
      entity.productId,
      entity.warehouseId,
      new Quantity(entity.available),
      new Quantity(entity.reserved),
    );
  }

  static toOrm(inventory: Inventory): Partial<InventoryOrmEntity> {
    return {
      productId: inventory.productId,
      warehouseId: inventory.warehouseId,
      available: inventory.available.value,
      reserved: inventory.reserved.value,
    };
  }
}
