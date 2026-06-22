import { Inject, Injectable } from '@nestjs/common';
import { InventoryRepository } from 'modules/inventory/domain/repositories/inventory.repository';
import { Quantity } from 'modules/inventory/domain/value-objects/quantity.vo';
import { INVENTORY_REPOSITORY } from 'shared/constants/repositories-impl.constants';

@Injectable()
export class ReleaseStockUseCase {
  constructor(
    @Inject(INVENTORY_REPOSITORY)
    private readonly repo: InventoryRepository,
  ) {}

  async execute(productId: string, quantity: number) {
    const inventory = await this.repo.findByProductId(productId);

    if (!inventory) {
      throw new Error('Inventory not found');
    }

    inventory.release(new Quantity(quantity));

    await this.repo.save(inventory);
  }
}
